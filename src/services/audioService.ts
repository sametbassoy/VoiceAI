import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

Sound.setCategory('Playback', true);

interface PlaybackState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
}

class AudioService {
  private currentSound: Sound | null = null;
  private playbackState: PlaybackState = {
    isPlaying: false,
    duration: 0,
    currentTime: 0,
  };
  private onPlaybackStateChange: ((state: PlaybackState) => void) | null = null;

  /**
   * Ses dosyasını buffer'dan oynat
   */
  async playAudioFromBuffer(
    audioBuffer: ArrayBuffer,
    filename: string = 'temp_audio.mp3'
  ): Promise<void> {
    try {
      // Önceki sesi durdur
      this.stop();

      // Geçici dosya yolu
      const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;

      // Buffer'ı base64'e çevir
      const base64Audio = this.arrayBufferToBase64(audioBuffer);

      // Dosyaya yaz
      await RNFS.writeFile(filePath, base64Audio, 'base64');

      // Sesi yükle ve oynat
      return new Promise((resolve, reject) => {
        this.currentSound = new Sound(filePath, '', (error) => {
          if (error) {
            console.error('Ses yükleme hatası:', error);
            reject(new Error('Ses dosyası yüklenemedi'));
            return;
          }

          // Ses bilgisini al
          const duration = this.currentSound?.getDuration() || 0;
          this.playbackState.duration = duration;

          // Sesi oynat
          this.currentSound?.play((success) => {
            if (success) {
              this.playbackState.isPlaying = false;
              this.updatePlaybackState();
              
              // Dosyayı temizle
              this.cleanupAudioFile(filePath);
              resolve();
            } else {
              reject(new Error('Ses oynatılamadı'));
            }

            // Sesi serbest bırak
            this.currentSound?.release();
            this.currentSound = null;
          });

          // Oynatma başladı
          this.playbackState.isPlaying = true;
          this.updatePlaybackState();
        });
      });
    } catch (error) {
      console.error('Ses oynatma hatası:', error);
      throw error;
    }
  }

  /**
   * Sesi durdur
   */
  stop(): void {
    if (this.currentSound) {
      this.currentSound.stop(() => {
        this.currentSound?.release();
        this.currentSound = null;
      });
      this.playbackState.isPlaying = false;
      this.updatePlaybackState();
    }
  }

  /**
   * Sesi duraklatma/devam ettir
   */
  togglePlayPause(): void {
    if (!this.currentSound) return;

    if (this.playbackState.isPlaying) {
      this.currentSound.pause();
      this.playbackState.isPlaying = false;
    } else {
      this.currentSound.play();
      this.playbackState.isPlaying = true;
    }
    this.updatePlaybackState();
  }

  /**
   * Oynatma durumunu al
   */
  getPlaybackState(): PlaybackState {
    return { ...this.playbackState };
  }

  /**
   * Oynatma durumu değişikliğini dinle
   */
  onStateChange(callback: (state: PlaybackState) => void): void {
    this.onPlaybackStateChange = callback;
  }

  /**
   * Oynatma durumunu güncelle
   */
  private updatePlaybackState(): void {
    if (this.onPlaybackStateChange) {
      this.onPlaybackStateChange(this.getPlaybackState());
    }
  }

  /**
   * ArrayBuffer'ı Base64'e çevir
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Geçici dosyayı temizle
   */
  private async cleanupAudioFile(filePath: string): Promise<void> {
    try {
      const exists = await RNFS.exists(filePath);
      if (exists) {
        await RNFS.unlink(filePath);
      }
    } catch (error) {
      console.warn('Dosya temizleme hatası:', error);
    }
  }

  /**
   * Tüm kaynakları temizle
   */
  cleanup(): void {
    this.stop();
    this.onPlaybackStateChange = null;
  }
}

export default new AudioService();


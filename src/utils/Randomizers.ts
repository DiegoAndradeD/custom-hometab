class Randomizers {
  private static shuffledImages: string[] = [];
  private static allImages: string[] = ["/wallpaper1.jpg"];

  private static shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  static getRandomWallpaper(): string {
    if (this.shuffledImages.length === 0) {
      this.shuffledImages = this.shuffleArray(this.allImages);
    }
    return this.shuffledImages.shift()!;
  }
}

export default Randomizers;

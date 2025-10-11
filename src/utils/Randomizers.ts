class Randomizers {
  private static shuffledImages: string[] = [];
  private static allImages: string[] = [
    "/wallpaper1.jpg",
    "/wallpaper2.jpg",
    "/wallpaper3.jpg",
  ];

  private static shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  static getRandomWallpaper(current: string): string {
    if (this.shuffledImages.length === 0) {
      this.shuffledImages = this.shuffleArray(this.allImages);
    }

    let next = this.shuffledImages.shift()!;
    if (next === current) {
      if (this.shuffledImages.length === 0) {
        this.shuffledImages = this.shuffleArray(this.allImages);
      }
      next = this.shuffledImages.shift()!;
    }

    return next;
  }
}

export default Randomizers;

class Formatters {
  static formatEnumValueToStringRepresentation = (
    value: string,
    enumObject: object,
    stringRepresentation: { [key: string]: string }
  ): string | null => {
    const upperValue = value.toUpperCase();
    if (Object.keys(enumObject).includes(upperValue)) {
      return stringRepresentation[
        upperValue as keyof typeof stringRepresentation
      ];
    }
    return null;
  };
  static createEnumMap<T extends Record<string, string>>(
    enumObj: T,
    enumStringRepresentationMap: Record<T[keyof T], string>
  ): { value: T[keyof T]; label: string }[] {
    return Object.entries(enumObj).map(([, value]) => ({
      value: value as T[keyof T],
      label: enumStringRepresentationMap[value as T[keyof T]],
    }));
  }
}

export default Formatters;

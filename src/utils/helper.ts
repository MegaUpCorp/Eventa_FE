export const convertIntToEnum = (enumType: any, value: number) => {
  switch (value) {
    case 0:
      return enumType[0]
    case 1:
      return enumType[1]
    default:
      return enumType[0]
  }
}

export const formatPrice = (num: number) => {
  return num.toLocaleString('de-DE')
}

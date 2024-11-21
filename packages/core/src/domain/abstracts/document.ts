
export abstract class Document {
  readonly value: string
  readonly emissionDate: Date

  protected constructor(value: string, emissionDate: Date) {
    this.value = value
    this.emissionDate = emissionDate
  }

  get emissionDateAsString(): string {
    return this.emissionDate.toISOString().split('T')[0]; 
  }
}

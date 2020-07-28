export class CustomError extends Error {
  constructor(obj, ...params) {
    // Passer les arguments restants (incluant ceux spécifiques au vendeur) au constructeur parent
    super(...params)

    // Maintenir dans la pile une trace adéquate de l'endroit où l'erreur a été déclenchée (disponible seulement en V8)
    if (Error.captureStackTrace) {
      // Error.captureStackTrace(this, CustomError);
    }
    this.errMessage = this.message
    this.name = 'CustomError'
    // Informations de déboguage personnalisées
    const { machin, status } = obj
    console.log(obj)
    this.machin = machin
    this.status = status
    this.date = new Date()
  }
}

export class InvalidDataError extends CustomError {
  constructor(obj, ...param) {
    super(obj, ...param)
    this.dataCheck = obj.dataCheck
  }
}

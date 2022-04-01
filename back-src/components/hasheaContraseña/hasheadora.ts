import * as crypto from"crypto"

export function hasheadora (text:string){
    return crypto.createHash('sha256').update(text).digest('hex')
  }

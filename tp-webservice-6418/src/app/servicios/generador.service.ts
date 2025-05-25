import { Injectable } from '@angular/core';
import { GoogleGenAI, Modality } from '@google/genai';
import { environment } from '../componentes/llave-api';
@Injectable({
  providedIn: 'root'
})

export class GeneradorService {
  private ia = new GoogleGenAI({ apiKey: environment.geminiapiKey });

  async generarImagenConTexto(textoSolicitud: string): Promise<any> {
    const respuesta = await this.ia.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: textoSolicitud,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    let textoGenerado = '';
    let urlImagen: string | undefined;

    const candidato = respuesta.candidates?.[0];
    const partes = candidato?.content?.parts;

    if (!partes || partes.length === 0) {
      throw new Error('No se recibieron partes de contenido en la respuesta.');
    }

    for (const parte of partes) {
      if (parte.text) {
        textoGenerado += parte.text;
      } else if (parte.inlineData?.data) {
        const datosBase64 = parte.inlineData.data;
        const caracteresBytes = atob(datosBase64);
        const numerosBytes = new Array(caracteresBytes.length);
        for (let i = 0; i < caracteresBytes.length; i++) {
          numerosBytes[i] = caracteresBytes.charCodeAt(i);
        }
        const arregloBytes = new Uint8Array(numerosBytes);
        const blobImagen = new Blob([arregloBytes], { type: 'image/png' });
        urlImagen = URL.createObjectURL(blobImagen);
      }
    }

    return { texto: textoGenerado, urlImagen };

  }
}
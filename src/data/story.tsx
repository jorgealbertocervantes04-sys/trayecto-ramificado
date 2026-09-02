import type { Scene } from "../types";

export const startingScene = "inicio";

export const storyScenes: Record<string, Scene> = {
  // ==================== INTRODUCCIÓN ====================
  inicio: {
    id: "inicio",
    type: "intro",
    title: "🛣️ CONOCIENDO TU TRAYECTO",
    subtitle: "De la carga a la utilidad · Hub Monterrey",
    content: (
      <>
        <div className="intro-box">
          <h2>El orden del profesional</h2>
          <p>
            Un operador experto sigue esta secuencia lógica:
          </p>
          <ol className="steps-list">
            <li><strong>📦 Conoce la carga</strong> (peso, dimensiones, tipo, regulaciones)</li>
            <li><strong>🗺️ Planea la ruta</strong> (destino, distancias, restricciones, tiempos)</li>
            <li><strong>🚛 Selecciona el semirremolque</strong> (tipo, capacidad, normas)</li>
            <li><strong>🚛 Elige el tractocamión</strong> (energía, potencia, autonomía)</li>
            <li><strong>💰 Evalúa rentabilidad</strong> (costos vs ingresos)</li>
          </ol>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA INICIAL</p>
          <h3>
            ¿Por qué crees que <strong>conocer la carga primero</strong> es más
            importante que elegir la unidad?
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Piensa: ¿puedes elegir unidad sin saber si son 2 t o 30 t? ¿Si es
            alimento o combustible? ¿Si mide 2 m o 5 m de alto?
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "iniciar_viaje",
        text: "💭 Ya reflexioné, comienzo por la carga",
        nextScene: "modulo1_carga_intro",
      },
    ],
  },

  // ==================== MÓDULO 1: LA CARGA ====================
  modulo1_carga_intro: {
    id: "modulo1_carga_intro",
    type: "lesson",
    title: "📦 MÓDULO 1 · LA CARGA",
    subtitle: "Todo comienza aquí: sin conocer la carga, no hay operación",
    content: (
      <>
        <div className="info-box">
          <h3>¿Por qué empezar por la carga?</h3>
          <p>
            Porque la carga <strong>dicta todo lo demás</strong>:
          </p>
          <ul>
            <li>✅ Define el <strong>semirremolque</strong> (caja seca, reefer, autotanque, etc.)</li>
            <li>✅ Define el <strong>tractocamión</strong> (potencia, energía, configuración)</li>
            <li>✅ Define la <strong>ruta</strong> (restricciones, puentes, túneles)</li>
            <li>✅ Define las <strong>regulaciones</strong> (permisos, señalización, tiempos)</li>
            <li>✅ Define la <strong>rentabilidad</strong> (costos operativos vs tarifa)</li>
          </ul>
        </div>

        <div className="question-card">
          <p className="question-label">VARIABLES CRÍTICAS DE LA CARGA</p>
          <h3>
            ¿Qué <strong>5 datos</strong> necesitas saber SIEMPRE antes de
            aceptar un servicio?
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Ejemplo: peso, dimensiones, tipo de mercancía, temperatura
            requerida, destino, tiempo de entrega...
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m1_carga_continuar",
        text: "📋 Ya identifiqué las variables, avanzo a clasificar cargas",
        nextScene: "modulo1_carga_tipos",
      },
    ],
  },

  modulo1_carga_tipos: {
    id: "modulo1_carga_tipos",
    type: "decision",
    title: "📦 MÓDULO 1 · TIPOS DE CARGA",
    subtitle: "Cada tipo exige regulaciones y equipos distintos",
    content: (
      <>
        <div className="info-box">
          <h3>Clasificación por regulación</h3>
          <p>
            Las cargas se dividen en:
          </p>
          <ul>
            <li><strong>Carga general:</strong> abarrotes, muebles, palets (sin regulación especial)</li>
            <li><strong>Carga perecedera:</strong> alimentos, farmacéuticos (requieren cadena fría)</li>
            <li><strong>Materiales peligrosos:</strong> combustibles, químicos (NOM-004-SCT, permisos SICT)</li>
            <li><strong>Carga sobredimensionada:</strong> maquinaria, estructuras (permisos especiales)</li>
          </ul>
        </div>

        <div className="case-box">
          <p className="case-label">CASO 1</p>
          <h3>📞 "Fresa Bella" te llama:</h3>
          <p>
            "120 cajas de fresa, 1.5 t, a 0 °C, Monterrey → SLP (510 km)."
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE CLASIFICACIÓN</p>
          <h3>
            <strong>¿Qué tipo de carga es?</strong> y <strong>¿qué regulaciones
            aplica?</strong>
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m1_tipos_perecedera",
        text: "🍓 Carga perecedera: requiere cadena fría, temperatura constante y registro",
        nextScene: "modulo1_carga_tipos_feedback_ok",
        points: 10,
      },
      {
        id: "m1_tipos_general",
        text: "📦 Carga general: solo necesita estar tapada y asegurada",
        nextScene: "modulo1_carga_tipos_feedback_error",
        points: 0,
      },
      {
        id: "m1_tipos_peligrosa",
        text: "⚠️ Material peligroso: requiere permisos y señalización especial",
        nextScene: "modulo1_carga_tipos_feedback_error",
        points: 0,
      },
    ],
  },

  modulo1_carga_tipos_feedback_ok: {
    id: "modulo1_carga_tipos_feedback_ok",
    type: "lesson",
    title: "✅ Clasificación correcta",
    content: (
      <>
        <div className="feedback-positive">
          <p>
            <strong>Correcto:</strong> La fresa es <strong>perecedera</strong>.
            Exige:
          </p>
          <ul>
            <li>✅ Temperatura constante (0 °C)</li>
            <li>✅ Registro de temperatura (evidencia al entregar)</li>
            <li>✅ Semirremolque refrigerado (reefer)</li>
            <li>✅ Tiempos de entrega ajustados (se echa a perder rápido)</li>
          </ul>
        </div>

        <div className="case-box">
          <p className="case-label">CASO 2</p>
          <h3>📞 "Gasolineras del Bajío" te llama:</h3>
          <p>
            "30,000 L de diésel, Monterrey → SLP (510 km)."
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE CLASIFICACIÓN</p>
          <h3>
            <strong>¿Qué tipo de carga es?</strong> y <strong>¿qué regulaciones
            aplica?</strong>
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m1_tipos_peligrosa_ok",
        text: "⛽ Material peligroso: NOM-004-SCT, permisos SICT, operador capacitado, rombos",
        nextScene: "modulo1_carga_peligrosas",
        points: 10,
      },
      {
        id: "m1_tipos_peligrosa_error",
        text: "📦 Carga general: solo se necesita un tanque y ya",
        nextScene: "modulo1_carga_peligrosas_feedback_error",
        points: 0,
      },
    ],
  },

  modulo1_carga_peligrosas: {
    id: "modulo1_carga_peligrosas",
    type: "lesson",
    title: "⚠️ MATERIALES PELIGROSOS",
    subtitle: "La regulación más estricta del transporte",
    content: (
      <>
        <div className="info-box">
          <h3>¿Por qué tanta regulación?</h3>
          <p>
            Porque un accidente con materiales peligrosos puede causar:
          </p>
          <ul>
            <li>🔥 Incendios y explosiones</li>
            <li>☠️ Contaminación del aire, agua y suelo</li>
            <li>🏥 Lesiones o muertes masivas</li>
            <li>💰 Multas hasta de $500,000 MXN</li>
            <li>🚔 Responsabilidad penal (cárcel para el operador y dueño)</li>
          </ul>
        </div>

        <div className="info-box">
          <h3>NOM-004-SCT-2016</h3>
          <p>
            Esta norma exige:
          </p>
          <ul>
            <li>✅ <strong>Rombos y señalización</strong> (número ONU, clase de riesgo)</li>
            <li>✅ <strong>Operador capacitado</strong> (curso de materiales peligrosos)</li>
            <li>✅ <strong>Unidad certificada</strong> (autotanque con especificaciones DOT/TC)</li>
            <li>✅ <strong>Permisos SICT</strong> (rutas autorizadas, horarios)</li>
            <li>✅ <strong>Seguros ampliados</strong> (responsabilidad civil por daños a terceros)</li>
            <li>✅ <strong>Hoja de seguridad</strong> (conocer cómo actuar en emergencia)</li>
          </ul>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE COMPRENSIÓN</p>
          <h3>
            <strong>¿Por qué un operador sin capacitación NO puede
            transportar combustible?</strong> Explica consecuencias.
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Piensa: ¿sabe cómo actuar en un derrame? ¿Conoce los puntos de
            reunión? ¿Sabe qué número marcar en emergencia?
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m1_peligrosas_continuar",
        text: "📚 Ya entendí la importancia, avanzo a carga sobredimensionada",
        nextScene: "modulo1_carga_sobredimensionada",
      },
    ],
  },

  modulo1_carga_sobredimensionada: {
    id: "modulo1_carga_sobredimensionada",
    type: "decision",
    title: "📦 MÓDULO 1 · CARGA SOBREDIMENSIONADA",
    subtitle: "Cuando la carga excede los límites legales",
    content: (
      <>
        <div className="info-box">
          <h3>Límites NOM-012-SCT-2-2017</h3>
          <p>
            El conjunto (unidad + remolque + carga) no puede exceder:
          </p>
          <ul>
            <li>📏 <strong>Altura:</strong> 4.25 m</li>
            <li>📏 <strong>Ancho:</strong> 2.60 m</li>
            <li>📏 <strong>Largo:</strong> 19.50 m (tractocamión + semirremolque)</li>
            <li>⚖️ <strong>Peso máximo:</strong> según tablas (ejes, distancia entre ejes)</li>
          </ul>
        </div>

        <div className="case-box">
          <p className="case-label">CASO 3</p>
          <h3>📞 "Constructora Alfa" te llama:</h3>
          <p>
            "Transformador de 3.1 m de alto, 8 t. Lo pongo en plana (piso a 1.3 m)
            y lo llevo de Monterrey a Manzanillo."
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE CÁLCULO</p>
          <h3>
            <strong>¿Aceptas el servicio tal cual?</strong> Haz la suma:
            altura de la plana + altura de la carga. Compárala con el límite legal.
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m1_sobre_no_ok",
        text: "🚫 NO: 1.3 m (plana) + 3.1 m (carga) = 4.4 m > 4.25 m de la NOM-012",
        nextScene: "modulo1_carga_sobredimensionada_feedback_ok",
        points: 15,
      },
      {
        id: "m1_sobre_si_error",
        text: "✅ SÍ: es carga especial, se puede llevar así sin problema",
        nextScene: "modulo1_carga_sobredimensionada_feedback_error",
        points: 0,
      },
    ],
  },

  modulo1_carga_sobredimensionada_feedback_ok: {
    id: "modulo1_carga_sobredimensionada_feedback_ok",
    type: "lesson",
    title: "✅ Cálculo correcto",
    content: (
      <>
        <div className="feedback-positive">
          <p>
            <strong>Exacto:</strong> 4.4 m excede el límite de 4.25 m.
            Consecuencias:
          </p>
          <ul>
            <li>❌ Multa en báscula ($5,000 - $50,000 MXN)</li>
            <li>❌ Regreso obligatorio (pierdes el flete)</li>
            <li>❌ Cliente enojado (pierdes futuros servicios)</li>
            <li>❌ Tiempo perdido (días en lugar de horas)</li>
          </ul>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE SOLUCIÓN</p>
          <h3>
            <strong>¿Qué alternativas le propones al cliente</strong> para
            cumplir la norma y aún así hacer el servicio?
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Opciones: plana de piso bajo (reduce 20-30 cm), permiso especial
            de dimensiones ante SICT, desarmar la carga en partes.
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m1_sobre_continuar",
        text: "💡 Ya tengo alternativas, avanzo al Módulo 2: La Ruta",
        nextScene: "modulo2_ruta_intro",
      },
    ],
  },

  modulo1_carga_sobredimensionada_feedback_error: {
    id: "modulo1_carga_sobredimensionada_feedback_error",
    type: "lesson",
    title: "⚠️ Error costoso",
    content: (
      <>
        <div className="feedback-warning">
          <p>
            <strong>Escenario real:</strong> Sales con 4.4 m. En la primera
            báscula te detienen.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE COSTO</p>
          <h3>
            <strong>¿Cuánto pierdes?</strong> Suma: multa + regreso + tiempo
            perdido + cliente enojado + flete no cobrado.
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Las multas por sobredimensionado van de $5,000 a $50,000 MXN.
            El tiempo perdido puede ser días. El cliente te blacklista.
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m1_sobre_reintentar",
        text: "🔄 Quiero recalcular y replantear",
        nextScene: "modulo1_carga_sobredimensionada",
      },
      {
        id: "m1_sobre_avanzar",
        text: "💸 Ya entendí el riesgo, avanzo al Módulo 2",
        nextScene: "modulo2_ruta_intro",
      },
    ],
  },

  // ==================== MÓDULO 2: LA RUTA ====================
  modulo2_ruta_intro: {
    id: "modulo2_ruta_intro",
    type: "lesson",
    title: "🗺️ MÓDULO 2 · LA RUTA",
    subtitle: "Conociendo el terreno: no todas las carreteras son iguales",
    content: (
      <>
        <div className="info-box">
          <h3>¿Por qué la ruta importa?</h3>
          <p>
            Porque la ruta define:
          </p>
          <ul>
            <li>⏱️ <strong>Tiempo de entrega</strong> (ventanas de tiempo del cliente)</li>
            <li>⛽ <strong>Consumo de combustible</strong> (sierra vs plano, cuota vs libre)</li>
            <li>🚧 <strong>Restricciones</strong> (puentes bajos, túneles prohibidos, pesos máximos)</li>
            <li>💰 <strong>Costos operativos</strong> (casetas, desgaste de llantas, frenos)</li>
            <li>🛡️ <strong>Seguridad</strong> (zonas de robo, iluminación, paradores)</li>
          </ul>
        </div>

        <div className="info-box">
          <h3>Tipos de carretera en México</h3>
          <table className="info-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Características</th>
                <th>Velocidad promedio</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Autopista de cuota</strong></td>
                <td>4+ carriles, casetas CAPUF, rápida y segura</td>
                <td>80-90 km/h</td>
                <td>Alto (casetas)</td>
              </tr>
              <tr>
                <td><strong>Libre federal</strong></td>
                <td>2 carriles, cruza pueblos, sin costo</td>
                <td>50-60 km/h</td>
                <td>Bajo (sin casetas)</td>
              </tr>
              <tr>
                <td><strong>Estatal / secundaria</strong></td>
                <td>Angosta, topes, curvas, solo unidades aptas</td>
                <td>30-40 km/h</td>
                <td>Bajo</td>
              </tr>
              <tr>
                <td><strong>Urbana</strong></td>
                <td>Tráfico, restricciones, horarios</td>
                <td>20-30 km/h</td>
                <td>Variable</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE ANÁLISIS</p>
          <h3>
            <strong>¿Cuándo elegirías cuota vs libre?</strong> Da un ejemplo de
            cada caso justificando con tiempo y costo.
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Ejemplo: "Ventana de tiempo ajustada = cuota (llegas rápido).
            Sin prisa y presupuesto limitado = libre (ahorras casetas)."
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m2_ruta_continuar",
        text: "📊 Ya entendí las diferencias, avanzo a calcular tiempos",
        nextScene: "modulo2_ruta_tiempos",
      },
    ],
  },

  modulo2_ruta_tiempos: {
    id: "modulo2_ruta_tiempos",
    type: "decision",
    title: "🗺️ MÓDULO 2 · CÁLCULO DE TIEMPOS",
    subtitle: "La matemática que salva tu utilidad",
    content: (
      <>
        <div className="info-box">
          <h3>Fórmula básica</h3>
          <p>
            <strong>Tiempo = Distancia ÷ Velocidad promedio</strong>
          </p>
          <p>
            Luego agregas: pausas obligatorias (NOM-087) + tiempo de carga/descarga
            + margen de imprevistos (tráfico, clima, casetas).
          </p>
        </div>

        <div className="case-box">
          <p className="case-label">CASO 1</p>
          <h3>📞 "Farma Vida" te llama:</h3>
          <p>
            "Medicamentos con ventana de 10 h. Monterrey → Querétaro (700 km).
            Deben llegar sí o sí en ese tiempo."
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE CÁLCULO</p>
          <h3>
            <strong>¿Qué ruta eliges?</strong> Calcula:
            <br />
            • Cuota: 700 km ÷ 80 km/h = ? h + 30 min de pausa NOM-087
            <br />
            • Libre: 700 km ÷ 50 km/h = ? h + 30 min de pausa NOM-087
            <br />
            <strong>¿Cuál cumple la ventana de 10 h?</strong>
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m2_tiempos_cuota_ok",
        text: "🛣️ Cuota: 700÷80=8.75 h + 0.5 h = 9.25 h ✅ Cabe en 10 h",
        nextScene: "modulo2_ruta_tiempos_feedback_ok",
        points: 15,
      },
      {
        id: "m2_tiempos_libre_error",
        text: "🛣️ Libre: 700÷50=14 h + 0.5 h = 14.5 h ❌ Supera 10 h",
        nextScene: "modulo2_ruta_tiempos_feedback_error",
        points: 0,
      },
    ],
  },

  modulo2_ruta_tiempos_feedback_ok: {
    id: "modulo2_ruta_tiempos_feedback_ok",
    type: "lesson",
    title: "✅ Cálculo correcto",
    content: (
      <>
        <div className="feedback-positive">
          <p>
            <strong>Exacto:</strong> En cuota llegas en ~9.25 h. En libre,
            14.5 h. La diferencia es de <strong>5+ horas</strong>.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE COSTO-BENEFICIO</p>
          <h3>
            <strong>¿Vale la pena pagar casetas?</strong> Compara:
            <br />
            • Costo de casetas MTY-QRO: ~$800 MXN
            <br />
            • Valor de cumplir la ventana: cliente satisfecho + flete cobrado +
            futuros servicios
            <br />
            • Costo de NO cumplir: cliente enojado + flete rechazado +
            blacklisting
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m2_tiempos_continuar",
        text: "💰 Ya entendí el ROI de las casetas, avanzo a restricciones",
        nextScene: "modulo2_ruta_restricciones",
      },
    ],
  },

  modulo2_ruta_tiempos_feedback_error: {
    id: "modulo2_ruta_tiempos_feedback_error",
    type: "lesson",
    title: "⚠️ Ventana incumplida",
    content: (
      <>
        <div className="feedback-warning">
          <p>
            <strong>Realidad:</strong> 14.5 h &gt; 10 h. El cliente rechaza la
            carga. <strong>¿Cuánto pierdes?</strong>
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE PÉRDIDA</p>
          <h3>
            <strong>Suma:</strong> flete no cobrado ($15,000 MXN) + combustible
            quemado ($4,000 MXN) + tiempo perdido (14 h) + cliente enojado
            (futuros servicios perdidos = ¿$100,000+ MXN al año?).
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m2_tiempos_avanzar",
        text: "💸 Ya entendí el costo, avanzo a restricciones",
        nextScene: "modulo2_ruta_restricciones",
      },
    ],
  },

  modulo2_ruta_restricciones: {
    id: "modulo2_ruta_restricciones",
    type: "decision",
    title: "🗺️ MÓDULO 2 · RESTRICCIONES",
    subtitle: "Cuando una ruta NO es opción",
    content: (
      <>
        <div className="info-box">
          <h3>Restricciones comunes</h3>
          <ul>
            <li>🚫 <strong>Túneles prohibidos a materiales peligrosos</strong></li>
            <li>🚫 <strong>Puentes con altura limitada</strong> (&lt; 4.25 m)</li>
            <li>🚫 <strong>Básculas con peso máximo por eje</strong></li>
            <li>🚫 <strong>Horarios urbanos</strong> (ej. CDMX: 5-11 h y 16-20 h prohibido)</li>
            <li>🚫 <strong>Zonas de robo</strong> (evitar de noche)</li>
          </ul>
        </div>

        <div className="case-box">
          <p className="case-label">CASO 2</p>
          <h3>Escenario:</h3>
          <p>
            Vas con combustible (material peligroso). El túnel dice:{" "}
            <strong>"PROHIBIDO MATERIALES PELIGROSOS"</strong>.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE DECISIÓN</p>
          <h3>
            <strong>¿Qué haces?</strong> Justifica con base en seguridad,
            normatividad y consecuencias.
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m2_rest_tunel_error",
        text: "🚫 Paso rápido, son solo 2 minutos, no pasa nada",
        nextScene: "modulo2_ruta_restricciones_feedback_error",
        points: 0,
      },
      {
        id: "m2_rest_alterna_ok",
        text: "🗺️ Tomo la ruta alterna señalada, aunque tarde más",
        nextScene: "modulo2_ruta_restricciones_feedback_ok",
        points: 15,
      },
    ],
  },

  modulo2_ruta_restricciones_feedback_ok: {
    id: "modulo2_ruta_restricciones_feedback_ok",
    type: "lesson",
    title: "✅ Seguridad primero",
    content: (
      <>
        <div className="feedback-positive">
          <p>
            <strong>Correcto:</strong> La ruta alterna se planea{" "}
            <strong>antes de salir</strong>, no enfrente del letrero.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE CONSECUENCIA</p>
          <h3>
            <strong>¿Qué pasa si hay un accidente con combustible en un túnel
            cerrado?</strong> Considera: incendio, explosión, muertes,
            clausura, responsabilidad penal.
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Un túnel es un espacio confinado. El fuego se propaga rápido.
            No hay salida. Las muertes son masivas. La cárcel es segura.
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m2_rest_continuar",
        text: "😰 Ya entendí la gravedad, avanzo al Módulo 3",
        nextScene: "modulo3_semirremolque_intro",
      },
    ],
  },

  modulo2_ruta_restricciones_feedback_error: {
    id: "modulo2_ruta_restricciones_feedback_error",
    type: "lesson",
    title: "⚠️ Riesgo catastrófico",
    content: (
      <>
        <div className="feedback-warning">
          <p>
            <strong>Escenario real:</strong> Un accidente con combustible en
            túnel cerrado = incendio, explosión, muertes, clausura, cárcel.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE RESPONSABILIDAD PENAL</p>
          <h3>
            Si hay explosión y mueren 20 personas,{" "}
            <strong>¿quién va a prisión?</strong> ¿La empresa o el operador que
            decidió pasar?
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Ambos: el operador por decisión imprudente y el dueño por no
            capacitar ni supervisar. Hasta 20 años de prisión cada uno.
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m2_rest_avanzar",
        text: "😰 Ya entendí la gravedad, avanzo al Módulo 3",
        nextScene: "modulo3_semirremolque_intro",
      },
    ],
  },

  // ==================== MÓDULO 3: SEMIRREMOLQUE ====================
  modulo3_semirremolque_intro: {
    id: "modulo3_semirremolque_intro",
    type: "lesson",
    title: "🚛 MÓDULO 3 · EL SEMIRREMOLQUE",
    subtitle: "La carga define el equipo: no todos los remolques sirven para todo",
    content: (
      <>
        <div className="info-box">
          <h3>¿Por qué el semirremolque va antes que el tracto?</h3>
          <p>
            Porque el semirremolque es quien <strong>lleva la carga</strong>.
            El tracto solo lo jala.
          </p>
          <p>
            Primero aseguras que el remolque sea adecuado para la carga.
            Luego eliges un tracto con suficiente potencia para moverlo.
          </p>
        </div>

        <div className="info-box">
          <h3>Tipos de semirremolques</h3>
          <div className="cards-grid">
            <article className="unit-card">
              <span>📦</span>
              <h4>Caja seca</h4>
              <p>Abarrotes, muebles, palets. 48-53 ft. Sin control de temperatura.</p>
            </article>

            <article className="unit-card">
              <span>❄️</span>
              <h4>Refrigerado (reefer)</h4>
              <p>Fresa, carne, farmacéuticos. Equipo de frío. Registra temperatura.</p>
            </article>

            <article className="unit-card">
              <span>🛢️</span>
              <h4>Autotanque</h4>
              <p>Combustibles, químicos. Certificado DOT/TC. Válvulas de seguridad.</p>
            </article>

            <article className="unit-card">
              <span>🚗</span>
              <h4>Nodriza</h4>
              <p>Autos nuevos. Doble piso. Hasta 9-11 unidades.</p>
            </article>

            <article className="unit-card">
              <span>🪵</span>
              <h4>Plana</h4>
              <p>Maquinaria, acero, estructuras. Sin paredes. Requiere amarres certificados.</p>
            </article>

            <article className="unit-card">
              <span>🚢</span>
              <h4>Chasis portacontenedor</h4>
              <p>Contenedores marítimos/ferroviarios. 20 y 40 ft. Twist-locks.</p>
            </article>
          </div>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE ASIGNACIÓN</p>
          <h3>
            <strong>Asigna el semirremolque correcto</strong> a cada carga:
            <br />
            • 120 cajas de fresa a 0 °C
            <br />
            • 30,000 L de diésel
            <br />
            • Contenedor marítimo de 40 ft
            <br />
            • 9 autos nuevos
            <br />
            • Transformador de 8 t y 3.1 m de alto
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m3_semir_continuar",
        text: "📋 Ya hice la asignación, avanzo a normas y medidas",
        nextScene: "modulo3_semirremolque_normas",
      },
    ],
  },

  modulo3_semirremolque_normas: {
    id: "modulo3_semirremolque_normas",
    type: "lesson",
    title: "🚛 MÓDULO 3 · NORMAS Y MEDIDAS",
    subtitle: "Lo que la ley exige conocer de cada semirremolque",
    content: (
      <>
        <div className="info-box">
          <h3>NOM-012-SCT-2-2017 · Límites del conjunto</h3>
          <table className="info-table">
            <thead>
              <tr>
                <th>Dimensión</th>
                <th>Límite máximo</th>
                <th>¿Qué incluye?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Altura</strong></td>
                <td>4.25 m</td>
                <td>Piso del remolque + altura de la carga</td>
              </tr>
              <tr>
                <td><strong>Ancho</strong></td>
                <td>2.60 m</td>
                <td>Carga + cualquier protuberancia (espejos, amarres)</td>
              </tr>
              <tr>
                <td><strong>Largo</strong></td>
                <td>19.50 m</td>
                <td>Tractocamión + semirremolque (no incluye espejos)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="info-box">
          <h3>Medidas estándar de semirremolques</h3>
          <table className="info-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Largo</th>
                <th>Ancho</th>
                <th>Alto (interno)</th>
                <th>Capacidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Caja seca</strong></td>
                <td>48-53 ft (14.6-16.2 m)</td>
                <td>2.60 m</td>
                <td>2.70 m</td>
                <td>22-26 t</td>
              </tr>
              <tr>
                <td><strong>Refrigerado</strong></td>
                <td>48-53 ft</td>
                <td>2.60 m</td>
                <td>2.50 m (menos por el equipo)</td>
                <td>20-24 t</td>
              </tr>
              <tr>
                <td><strong>Autotanque</strong></td>
                <td>Variable</td>
                <td>2.60 m</td>
                <td>Variable</td>
                <td>30,000-40,000 L</td>
              </tr>
              <tr>
                <td><strong>Plana</strong></td>
                <td>48-53 ft</td>
                <td>2.60 m</td>
                <td>1.30 m (piso al suelo)</td>
                <td>35-40 t</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE CÁLCULO</p>
          <h3>
            <strong>Transformador de 3.1 m en plana:</strong>
            <br />
            • Altura del piso de la plana: 1.3 m
            <br />
            • Altura de la carga: 3.1 m
            <br />
            • <strong>Altura total:</strong> 1.3 + 3.1 = ? m
            <br />
            • <strong>¿Excede el límite de 4.25 m?</strong>
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m3_normas_continuar",
        text: "📐 Ya hice el cálculo, avanzo a regulaciones por tipo",
        nextScene: "modulo3_semirremolque_regulaciones",
      },
    ],
  },

  modulo3_semirremolque_regulaciones: {
    id: "modulo3_semirremolque_regulaciones",
    type: "lesson",
    title: "🚛 MÓDULO 3 · REGULACIONES POR TIPO",
    subtitle: "Cada tipo de semirremolque tiene sus propias reglas",
    content: (
      <>
        <div className="info-box">
          <h3>Refrigerados (reefer)</h3>
          <ul>
            <li>✅ <strong>Bitácora de temperatura:</strong> registro continuo (evidencia al entregar)</li>
            <li>✅ <strong>Pre-enfriado:</strong> el remolque debe estar a temperatura antes de cargar</li>
            <li>✅ <strong>Termógrafo:</strong> dispositivo que registra temperatura durante todo el viaje</li>
            <li>✅ <strong>Inspección sanitaria:</strong> en alimentos y farmacéuticos</li>
          </ul>
        </div>

        <div className="info-box">
          <h3>Autotanques (materiales peligrosos)</h3>
          <ul>
            <li>✅ <strong>Certificación DOT/TC:</strong> especificaciones de construcción</li>
            <li>✅ <strong>Válvulas de seguridad:</strong> alivio de presión, fondo, emergencia</li>
            <li>✅ <strong>Señalización NOM-004-SCT:</strong> rombos, número ONU, clase de riesgo</li>
            <li>✅ <strong>Permisos SICT:</strong> rutas autorizadas, horarios</li>
            <li>✅ <strong>Operador capacitado:</strong> curso de materiales peligrosos vigente</li>
          </ul>
        </div>

        <div className="info-box">
          <h3>Planas (carga sobredimensionada)</h3>
          <ul>
            <li>✅ <strong>Permisos especiales:</strong> si excede 4.25 m de alto, 2.60 m de ancho o 19.50 m de largo</li>
            <li>✅ <strong>Amarres certificados:</strong> cadenas, tensores, eslingas con capacidad suficiente</li>
            <li>✅ <strong>Ruta autorizada:</strong> sin puentes bajos, con escoltas si es necesario</li>
            <li>✅ <strong>Señalización de carga ancha:</strong> banderas, luces, letreros</li>
          </ul>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE COMPRENSIÓN</p>
          <h3>
            <strong>¿Por qué un reefer cuesta más operar que una caja seca?</strong>
            Considera: equipo de frío, combustible, mantenimiento, registro.
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 El equipo de frío consume combustible extra (1-2 L/h). Requiere
            mantenimiento especializado. El termógrafo tiene costo. La
            responsabilidad es mayor (cadena fría).
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m3_regulaciones_continuar",
        text: "💰 Ya entendí los costos diferenciales, avanzo al Módulo 4",
        nextScene: "modulo4_tracto_intro",
      },
    ],
  },

  // ==================== MÓDULO 4: TRACTOCAMIÓN ====================
  modulo4_tracto_intro: {
    id: "modulo4_tracto_intro",
    type: "lesson",
    title: "🚛 MÓDULO 4 · EL TRACTOCAMIÓN",
    subtitle: "Ahora sí: eligiendo la cabeza que jala tu negocio",
    content: (
      <>
        <div className="info-box">
          <h3>¿Por qué el tracto va al final?</h3>
          <p>
            Porque primero aseguras:
          </p>
          <ol>
            <li>✅ Conocer la carga (peso, tipo, regulaciones)</li>
            <li>✅ Planear la ruta (distancia, restricciones, tiempos)</li>
            <li>✅ Seleccionar el semirremolque (tipo, capacidad, normas)</li>
          </ol>
          <p>
            <strong>Solo entonces</strong> eliges un tracto con:
          </p>
          <ul>
            <li>✅ Suficiente potencia para mover el conjunto</li>
            <li>✅ Energía adecuada para la distancia (diésel, gas, eléctrico)</li>
            <li>✅ Configuración correcta (número de ejes, suspensión, cabina)</li>
          </ul>
        </div>

        <div className="info-box">
          <h3>Energías disponibles</h3>
          <div className="cards-grid">
            <article className="unit-card">
              <span>⛽</span>
              <h4>Diésel</h4>
              <p><strong>Autonomía:</strong> 1,500+ km</p>
              <p><strong>Uso ideal:</strong> largo recorrido, libertad total de ruta</p>
              <p><strong>Costo:</strong> medio-alto, pero estaciones en todas partes</p>
            </article>

            <article className="unit-card">
              <span>🔵</span>
              <h4>Gas natural (LNG/CNG)</h4>
              <p><strong>Autonomía:</strong> ~1,000 km</p>
              <p><strong>Uso ideal:</strong> rutas medias con estaciones de gas en ruta</p>
              <p><strong>Costo:</strong> 30-40% menos que diésel, más limpio</p>
            </article>

            <article className="unit-card">
              <span>⚡</span>
              <h4>Eléctrico</h4>
              <p><strong>Autonomía:</strong> 250-350 km</p>
              <p><strong>Uso ideal:</strong> regional/urbano con electrolineras</p>
              <p><strong>Costo:</strong> muy bajo por km, pero infraestructura limitada</p>
            </article>
          </div>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE SELECCIÓN</p>
          <h3>
            <strong>Monterrey → Lázaro Cárdenas (1,150 km):</strong>
            <br />
            ¿Qué energía eliges y por qué?
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Considera: autonomía real vs distancia total. ¿Dónde recargas?
            ¿Qué pasa si no hay estaciones en la ruta?
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m4_tracto_diesel",
        text: "⛽ Diésel: 1,500+ km de autonomía, estaciones en toda la ruta, libertad total",
        nextScene: "modulo4_tracto_diesel_feedback",
        points: 15,
      },
      {
        id: "m4_tracto_gas",
        text: "🔵 Gas natural: más limpio y barato, pero ¿hay estaciones en la ruta?",
        nextScene: "modulo4_tracto_gas_feedback",
        points: 5,
      },
      {
        id: "m4_tracto_electrico",
        text: "⚡ Eléctrico: cero emisiones, ideal para cuidar el planeta",
        nextScene: "modulo4_tracto_electrico_feedback",
        points: 0,
      },
    ],
  },

  modulo4_tracto_diesel_feedback: {
    id: "modulo4_tracto_diesel_feedback",
    type: "lesson",
    title: "✅ Selección óptima",
    content: (
      <>
        <div className="feedback-positive">
          <p>
            <strong>Correcto:</strong> Para 1,150 km, el diésel es la única
            opción que garantiza llegar sin quedar varado.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE RENTABILIDAD</p>
          <h3>
            <strong>¿Por qué el diésel sigue siendo el rey del largo recorrido?</strong>
            Considera: autonomía, infraestructura, tiempo de reabastecimiento,
            costo total del viaje.
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m4_tracto_continuar",
        text: "💰 Ya entendí la ecuación, avanzo a configuración de ejes",
        nextScene: "modulo4_tracto_ejes",
      },
    ],
  },

  modulo4_tracto_gas_feedback: {
    id: "modulo4_tracto_gas_feedback",
    type: "lesson",
    title: "🔵 Parcialmente viable",
    content: (
      <>
        <div className="feedback-neutral">
          <p>
            <strong>Matizable:</strong> El gas es 30-40% más barato que el
            diésel. PERO: ¿hay estaciones de gas en la ruta MTY-Lázaro Cárdenas?
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE INFRAESTRUCTURA</p>
          <h3>
            <strong>¿Qué pasa si te quedas sin gas a mitad de la sierra?</strong>
            Considera: tiempo de espera por grúa, costo de reabastecimiento,
            cliente enojado, flete rechazado.
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Las estaciones de gas no están cada 50 km como las gasolineras
            diésel. Una grúa puede tardar 4-8 h en llegar. El cliente no espera.
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m4_tracto_continuar",
        text: "⛽ Ya entendí el riesgo, avanzo a configuración de ejes",
        nextScene: "modulo4_tracto_ejes",
      },
    ],
  },

  modulo4_tracto_electrico_feedback: {
    id: "modulo4_tracto_electrico_feedback",
    type: "lesson",
    title: "⚠️ Intención loable, realidad cruda",
    content: (
      <>
        <div className="feedback-warning">
          <p>
            <strong>Realidad:</strong> Un eléctrico típico tiene 250-350 km de
            autonomía. <strong>¿A qué km te quedas varado?</strong>
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE REALIDAD</p>
          <h3>
            Si sales de Monterrey con 300 km de rango y el destino está a 1,150
            km, <strong>¿dónde exactamente te detendrías?</strong> ¿Hay
            electrolineras en esa zona?
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Entre Monterrey y SLP hay tramos de 150+ km sin electrolineras.
            Una recarga toma 1-2 h (si hay cargador disponible). El cliente no
            espera.
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m4_tracto_continuar",
        text: "⛽ Ya entendí el límite actual, avanzo a configuración de ejes",
        nextScene: "modulo4_tracto_ejes",
      },
    ],
  },

  modulo4_tracto_ejes: {
    id: "modulo4_tracto_ejes",
    type: "lesson",
    title: "🚛 MÓDULO 4 · CONFIGURACIÓN DE EJES",
    subtitle: "La configuración que define cuántas toneladas puedes mover",
    content: (
      <>
        <div className="info-box">
          <h3>Configuraciones comunes</h3>
          <table className="info-table">
            <thead>
              <tr>
                <th>Configuración</th>
                <th>Ejes</th>
                <th>Peso máximo (conjunto)</th>
                <th>Uso típico</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>T680 6x4</strong></td>
                <td>3 ejes (2 traseros motrices)</td>
                <td>~65 t</td>
                <td>Largo recorrido, carga general</td>
              </tr>
              <tr>
                <td><strong>T680 6x2</strong></td>
                <td>3 ejes (1 trasero motriz + 1 de empuje)</td>
                <td>~55 t</td>
                <td>Rutas medias, ahorro de combustible</td>
              </tr>
              <tr>
                <td><strong>Cascadia 6x4</strong></td>
                <td>3 ejes (2 traseros motrices)</td>
                <td>~65 t</td>
                <td>Largo recorrido, confort</td>
              </tr>
              <tr>
                <td><strong>Rabón 4x2</strong></td>
                <td>2 ejes (1 trasero motriz)</td>
                <td>~15 t</td>
                <td>Reparto urbano, distancias cortas</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE SELECCIÓN</p>
          <h3>
            <strong>22 t de aguacate, Monterrey → Laredo (240 km):</strong>
            <br />
            ¿Qué configuración eliges y por qué?
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Considera: peso total (carga + remolque + tracto), distancia,
            tipo de ruta (carretera vs ciudad), necesidad de cabina dormitorio.
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m4_ejes_t680",
        text: "🚛 T680 6x4: potencia de sobra, cabina dormitorio, ideal para frontera",
        nextScene: "modulo4_tracto_ejes_feedback_ok",
        points: 10,
      },
      {
        id: "m4_ejes_rabon",
        text: "🚚 Rabón 4x2: más económico, pero ¿aguanta 22 t + remolque?",
        nextScene: "modulo4_tracto_ejes_feedback_error",
        points: 0,
      },
    ],
  },

  modulo4_tracto_ejes_feedback_ok: {
    id: "modulo4_tracto_ejes_feedback_ok",
    type: "lesson",
    title: "✅ Configuración adecuada",
    content: (
      <>
        <div className="feedback-positive">
          <p>
            <strong>Correcto:</strong> El T680 6x4 maneja 22 t sin problema.
            La cabina dormitorio es útil si hay espera en frontera.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE RENTABILIDAD</p>
          <h3>
            <strong>¿Vale la pena un T680 para solo 240 km?</strong> Compara:
            <br />
            • T680 6x4: más potente, más caro de operar
            <br />
            • T680 6x2: suficiente, más económico
            <br />
            • ¿Hay una opción intermedia?
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m4_ejes_continuar",
        text: "💰 Ya entendí el balance, avanzo a la decisión final",
        nextScene: "modulo5_decision_final",
      },
    ],
  },

  modulo4_tracto_ejes_feedback_error: {
    id: "modulo4_tracto_ejes_feedback_error",
    type: "lesson",
    title: "⚠️ Subdimensionado",
    content: (
      <>
        <div className="feedback-warning">
          <p>
            <strong>Realidad:</strong> Un rabón 4x2 está diseñado para ~15 t
            <strong>en caja fija</strong>. No para jalar semirremolque con 22 t.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE CAPACIDAD</p>
          <h3>
            <strong>¿Qué pasa si excedes la capacidad del eje trasero?</strong>
            Considera: multa en báscula, desgaste prematuro, falla mecánica,
            accidente en sierra.
          </h3>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m4_ejes_continuar",
        text: "⚖️ Ya entendí la importancia del peso, avanzo a la decisión final",
        nextScene: "modulo5_decision_final",
      },
    ],
  },

  // ==================== MÓDULO 5: DECISIÓN FINAL ====================
  modulo5_decision_final: {
    id: "modulo5_decision_final",
    type: "decision",
    title: "💰 MÓDULO 5 · DECISIÓN FINAL",
    subtitle: "Integrando todo: ¿es rentable y viable?",
    content: (
      <>
        <div className="case-box">
          <p className="case-label">CASO FINAL</p>
          <h3>📞 "Farma Global" te llama:</h3>
          <p>
            "24 t de vacunas a 5 °C, Monterrey → Lázaro Cárdenas (1,150 km),
            entrega en 12 h. Tarifa: $25,000 MXN."
          </p>
        </div>

        <div className="info-box">
          <h3>Variables a integrar</h3>
          <ul>
            <li>📦 <strong>Carga:</strong> 24 t, vacunas (perecedera, cadena fría)</li>
            <li>🗺️ <strong>Ruta:</strong> 1,150 km, 12 h de ventana (ajustada)</li>
            <li>🚛 <strong>Semirremolque:</strong> reefer (requiere frío y registro)</li>
            <li>🚛 <strong>Tracto:</strong> diésel 6x4 (autonomía + potencia)</li>
            <li>⏱️ <strong>Tiempo:</strong> 1,150÷80=14.4 h + 0.5 h pausa = 14.9 h</li>
            <li>💰 <strong>Costos:</strong> combustible ($6,000) + casetas ($1,200) + desgaste + operador</li>
          </ul>
        </div>

        <div className="question-card">
          <p className="question-label">PREGUNTA DE VIABILIDAD</p>
          <h3>
            <strong>¿Aceptas el servicio tal cual?</strong> Si no,{" "}
            <strong>¿qué contrapropuesta haces?</strong> Justifica con:
            tiempos, normatividad (NOM-087), costos y utilidad.
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 14.9 h &gt; 12 h. Un operador no puede legally en ese tiempo.
            ¿Doble operador? ¿Ampliar ventana? ¿Aumentar tarifa?
          </p>
        </div>
      </>
    ),
    decisions: [
      {
        id: "m5_final_un_operador",
        text: "✅ SÍ con un operador: le echo ganas y llego en 12 h",
        nextScene: "modulo5_final_riesgo",
        points: 0,
      },
      {
        id: "m5_final_doble_operador",
        text: "🔄 CONTRAPROPUESTA: doble operador o ventana de 16 h; tarifa $32,000 MXN",
        nextScene: "modulo5_final_profesional",
        points: 30,
      },
      {
        id: "m5_final_rechazo",
        text: "❌ NO: es inviable, cuelgo el teléfono",
        nextScene: "modulo5_final_incompleto",
        points: 0,
      },
    ],
  },

  modulo5_final_profesional: {
    id: "modulo5_final_profesional",
    type: "ending",
    title: "🏆 FINAL · OPERADOR ESTRATÉGICO",
    subtitle: "La seguridad, normatividad y rentabilidad guían tu decisión",
    content: (
      <>
        <div className="feedback-positive">
          <p>
            <strong>Excelente:</strong> No solo identificaste el equipo
            correcto: propusiste una configuración operativa viable, segura y
            rentable.
          </p>
        </div>

        <div className="info-box">
          <h3>Tu razonamiento fue:</h3>
          <ol>
            <li>✅ <strong>Carga:</strong> 24 t, vacunas → reefer, cadena fría</li>
            <li>✅ <strong>Ruta:</strong> 1,150 km → diésel, cuota, 14.9 h</li>
            <li>✅ <strong>Tiempo:</strong> 14.9 h &gt; 12 h → viola NOM-087 con 1 operador</li>
            <li>✅ <strong>Solución:</strong> doble operador (turnos) o ventana de 16 h</li>
            <li>✅ <strong>Utilidad:</strong> $32,000 - $9,000 (costos) = $23,000 MXN</li>
          </ol>
        </div>

        <div className="summary-box">
          <p>
            <strong>Puntuación total:</strong> 30 pts
          </p>
          <p>
            <strong>Rango:</strong> 🏆 Operador Estratégico
          </p>
          <p>
            <strong>Principio aprendido:</strong> "Conoce la carga, planea la
            ruta, selecciona el equipo, evalúa la utilidad. Ese es el orden del
            profesional."
          </p>
        </div>
      </>
    ),
    decisions: [],
  },

  modulo5_final_riesgo: {
    id: "modulo5_final_riesgo",
    type: "ending",
    title: "⚠️ FINAL · RIESGO OPERATIVO",
    subtitle: "La urgencia no debe reemplazar la planeación",
    content: (
      <>
        <div className="feedback-warning">
          <p>
            <strong>Análisis:</strong> 1,150 km a 80 km/h = 14.9 h + pausas
            obligatorias. <strong>No cabe en 12 h con un operador</strong> sin
            violar la NOM-087.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">REFLEXIÓN FINAL</p>
          <h3>
            <strong>¿Qué debiste considerar</strong> antes de aceptar? Lista al
            menos 3 variables que ignoraste.
          </h3>
        </div>

        <div className="hint-box">
          <p>
            💭 Ejemplo: tiempos reales de viaje, pausas legales, fatiga del
            operador, cadena fría, costos operativos, utilidad real.
          </p>
        </div>
      </>
    ),
    decisions: [],
  },

  modulo5_final_incompleto: {
    id: "modulo5_final_incompleto",
    type: "ending",
    title: "🛣️ FINAL · DECISIÓN INCOMPLETA",
    subtitle: "Rechazar no siempre es la única solución",
    content: (
      <>
        <div className="feedback-neutral">
          <p>
            <strong>Observación:</strong> Detectaste que la solicitud tiene
            problemas, pero un profesional ofrece una alternativa segura y
            rentable: doble operador, ventana ampliada, tarifa ajustada.
          </p>
        </div>

        <div className="question-card">
          <p className="question-label">REFLEXIÓN FINAL</p>
          <h3>
            <strong>¿Qué contrapropuesta</strong> hubieras hecho para cumplir
            con seguridad, normatividad y utilidad?
          </h3>
        </div>
      </>
    ),
    decisions: [],
  },
};
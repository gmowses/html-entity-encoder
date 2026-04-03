import { useState } from 'react'
import { Copy, Sun, Moon, Languages, Code2, ArrowLeftRight } from 'lucide-react'

const translations = {
  en: {
    title: 'HTML Entity Encoder / Decoder',
    subtitle: 'Encode and decode HTML entities. Reference table of the most common entities included.',
    encodeTab: 'Encode',
    decodeTab: 'Decode',
    inputLabel: 'Input text',
    outputLabel: 'Output',
    inputPlaceholder: 'Paste your text here...',
    encode: 'Encode',
    decode: 'Decode',
    copy: 'Copy',
    copied: 'Copied!',
    clear: 'Clear',
    referenceTable: 'Common HTML Entities',
    character: 'Character',
    entity: 'Entity',
    codePoint: 'Code Point',
    description: 'Description',
    builtBy: 'Built by',
  },
  pt: {
    title: 'Codificador / Decodificador HTML',
    subtitle: 'Codifique e decodifique entidades HTML. Tabela de referencia das entidades mais comuns inclusa.',
    encodeTab: 'Codificar',
    decodeTab: 'Decodificar',
    inputLabel: 'Texto de entrada',
    outputLabel: 'Saida',
    inputPlaceholder: 'Cole seu texto aqui...',
    encode: 'Codificar',
    decode: 'Decodificar',
    copy: 'Copiar',
    copied: 'Copiado!',
    clear: 'Limpar',
    referenceTable: 'Entidades HTML Comuns',
    character: 'Caractere',
    entity: 'Entidade',
    codePoint: 'Ponto de Codigo',
    description: 'Descricao',
    builtBy: 'Criado por',
  },
} as const

type Lang = keyof typeof translations

const ENTITIES: { char: string; entity: string; code: string; descEn: string; descPt: string }[] = [
  { char: '&', entity: '&amp;', code: '&#38;', descEn: 'Ampersand', descPt: 'E comercial' },
  { char: '<', entity: '&lt;', code: '&#60;', descEn: 'Less than', descPt: 'Menor que' },
  { char: '>', entity: '&gt;', code: '&#62;', descEn: 'Greater than', descPt: 'Maior que' },
  { char: '"', entity: '&quot;', code: '&#34;', descEn: 'Quotation mark', descPt: 'Aspas duplas' },
  { char: "'", entity: '&apos;', code: '&#39;', descEn: 'Apostrophe', descPt: 'Apostrofo' },
  { char: ' ', entity: '&nbsp;', code: '&#160;', descEn: 'Non-breaking space', descPt: 'Espaco nao quebravel' },
  { char: '©', entity: '&copy;', code: '&#169;', descEn: 'Copyright', descPt: 'Direito autoral' },
  { char: '®', entity: '&reg;', code: '&#174;', descEn: 'Registered trademark', descPt: 'Marca registrada' },
  { char: '™', entity: '&trade;', code: '&#8482;', descEn: 'Trademark', descPt: 'Marca comercial' },
  { char: '€', entity: '&euro;', code: '&#8364;', descEn: 'Euro sign', descPt: 'Sinal de euro' },
  { char: '£', entity: '&pound;', code: '&#163;', descEn: 'Pound sign', descPt: 'Libra esterlina' },
  { char: '¥', entity: '&yen;', code: '&#165;', descEn: 'Yen sign', descPt: 'Iene japones' },
  { char: '¢', entity: '&cent;', code: '&#162;', descEn: 'Cent sign', descPt: 'Centavo' },
  { char: '§', entity: '&sect;', code: '&#167;', descEn: 'Section sign', descPt: 'Sinal de secao' },
  { char: '°', entity: '&deg;', code: '&#176;', descEn: 'Degree sign', descPt: 'Grau' },
  { char: '±', entity: '&plusmn;', code: '&#177;', descEn: 'Plus-minus sign', descPt: 'Mais ou menos' },
  { char: '×', entity: '&times;', code: '&#215;', descEn: 'Multiplication sign', descPt: 'Multiplicacao' },
  { char: '÷', entity: '&divide;', code: '&#247;', descEn: 'Division sign', descPt: 'Divisao' },
  { char: '¼', entity: '&frac14;', code: '&#188;', descEn: 'One quarter', descPt: 'Um quarto' },
  { char: '½', entity: '&frac12;', code: '&#189;', descEn: 'One half', descPt: 'Metade' },
  { char: '¾', entity: '&frac34;', code: '&#190;', descEn: 'Three quarters', descPt: 'Tres quartos' },
  { char: '→', entity: '&rarr;', code: '&#8594;', descEn: 'Right arrow', descPt: 'Seta para direita' },
  { char: '←', entity: '&larr;', code: '&#8592;', descEn: 'Left arrow', descPt: 'Seta para esquerda' },
  { char: '↑', entity: '&uarr;', code: '&#8593;', descEn: 'Up arrow', descPt: 'Seta para cima' },
  { char: '↓', entity: '&darr;', code: '&#8595;', descEn: 'Down arrow', descPt: 'Seta para baixo' },
  { char: '♠', entity: '&spades;', code: '&#9824;', descEn: 'Spade suit', descPt: 'Espadas' },
  { char: '♣', entity: '&clubs;', code: '&#9827;', descEn: 'Club suit', descPt: 'Paus' },
  { char: '♥', entity: '&hearts;', code: '&#9829;', descEn: 'Hearts suit', descPt: 'Copas' },
  { char: '♦', entity: '&diams;', code: '&#9830;', descEn: 'Diamonds suit', descPt: 'Ouros' },
  { char: '…', entity: '&hellip;', code: '&#8230;', descEn: 'Horizontal ellipsis', descPt: 'Reticencias' },
  { char: '–', entity: '&ndash;', code: '&#8211;', descEn: 'En dash', descPt: 'Traco medio' },
  { char: '—', entity: '&mdash;', code: '&#8212;', descEn: 'Em dash', descPt: 'Traco longo' },
  { char: '"', entity: '&ldquo;', code: '&#8220;', descEn: 'Left double quotation', descPt: 'Aspas duplas esquerdas' },
  { char: '"', entity: '&rdquo;', code: '&#8221;', descEn: 'Right double quotation', descPt: 'Aspas duplas direitas' },
  { char: 'à', entity: '&agrave;', code: '&#224;', descEn: 'a with grave accent', descPt: 'a com acento grave' },
  { char: 'á', entity: '&aacute;', code: '&#225;', descEn: 'a with acute accent', descPt: 'a com acento agudo' },
  { char: 'â', entity: '&acirc;', code: '&#226;', descEn: 'a with circumflex', descPt: 'a com circunflexo' },
  { char: 'ã', entity: '&atilde;', code: '&#227;', descEn: 'a with tilde', descPt: 'a com til' },
  { char: 'ç', entity: '&ccedil;', code: '&#231;', descEn: 'c with cedilla', descPt: 'c cedilha' },
  { char: 'ñ', entity: '&ntilde;', code: '&#241;', descEn: 'n with tilde', descPt: 'n com til' },
]

function encodeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/[\u00A0-\uFFFF]/g, c => `&#${c.charCodeAt(0)};`)
}

function decodeHTML(text: string): string {
  const txt = document.createElement('textarea')
  txt.innerHTML = text
  return txt.value
}

export default function HtmlEntityEncoder() {
  const [lang, setLang] = useState<Lang>(() => navigator.language.startsWith('pt') ? 'pt' : 'en')
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const t = translations[lang]

  const toggleDark = () => {
    setDark(d => {
      document.documentElement.classList.toggle('dark', !d)
      return !d
    })
  }

  const handleProcess = () => {
    if (mode === 'encode') {
      setOutput(encodeHTML(input))
    } else {
      setOutput(decodeHTML(input))
    }
  }

  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </div>
            <span className="font-semibold">HTML Entity Encoder</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(l => l === 'en' ? 'pt' : 'en')} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>
            <button onClick={toggleDark} className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="https://github.com/gmowses/html-entity-encoder" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">{t.subtitle}</p>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 w-fit">
            {(['encode', 'decode'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === m ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
              >
                <div className="flex items-center gap-1.5">
                  <ArrowLeftRight size={13} />
                  {m === 'encode' ? t.encodeTab : t.decodeTab}
                </div>
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
              <h2 className="font-semibold">{t.inputLabel}</h2>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t.inputPlaceholder}
                rows={8}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleProcess}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
                >
                  <ArrowLeftRight size={15} />
                  {mode === 'encode' ? t.encode : t.decode}
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {t.clear}
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{t.outputLabel}</h2>
                <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40"
                >
                  <Copy size={12} />
                  {copied ? t.copied : t.copy}
                </button>
              </div>
              <div className="min-h-[200px] rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm break-all select-all whitespace-pre-wrap">
                {output || <span className="text-zinc-400 italic">...</span>}
              </div>
            </div>
          </div>

          {/* Reference table */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="font-semibold mb-4">{t.referenceTable}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-2 px-3 text-zinc-500 dark:text-zinc-400 font-medium">{t.character}</th>
                    <th className="text-left py-2 px-3 text-zinc-500 dark:text-zinc-400 font-medium">{t.entity}</th>
                    <th className="text-left py-2 px-3 text-zinc-500 dark:text-zinc-400 font-medium">{t.codePoint}</th>
                    <th className="text-left py-2 px-3 text-zinc-500 dark:text-zinc-400 font-medium">{t.description}</th>
                  </tr>
                </thead>
                <tbody>
                  {ENTITIES.map((e) => (
                    <tr key={e.entity} className="border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="py-2 px-3 font-mono text-center text-lg">{e.char}</td>
                      <td className="py-2 px-3 font-mono text-blue-600 dark:text-blue-400">{e.entity}</td>
                      <td className="py-2 px-3 font-mono text-zinc-500 dark:text-zinc-400">{e.code}</td>
                      <td className="py-2 px-3 text-zinc-600 dark:text-zinc-400">{lang === 'en' ? e.descEn : e.descPt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <span>{t.builtBy} <a href="https://github.com/gmowses" className="text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition-colors">Gabriel Mowses</a></span>
          <span>MIT License</span>
        </div>
      </footer>
    </div>
  )
}

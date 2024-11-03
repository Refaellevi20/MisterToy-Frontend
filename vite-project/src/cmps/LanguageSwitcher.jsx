import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={() => changeLanguage('en')}
        style={{ fontWeight: i18n.language === 'en' ? 'bold' : 'normal' }}>
        English
      </button>
      <button
        onClick={() => changeLanguage('es')}
        style={{
          fontWeight: i18n.language === 'es' ? 'bold' : 'normal',
          color: i18n.language === 'es' ? 'red' : 'green'
        }}>
        Español
      </button>
    </div>
  )
}

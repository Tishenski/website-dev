import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react'

const contacts = [
  {
    icon: Phone,
    title: 'Телефон',
    lines: ['+38 (044) 123-45-67', '+38 (067) 123-45-67'],
    action: 'tel:+380441234567',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@teapro.ua', 'support@teapro.ua'],
    action: 'mailto:info@teapro.ua',
  },
  {
    icon: MapPin,
    title: 'Адреса',
    lines: ['м. Київ, вул. Хрещатик, 22', 'офіс 301, 3-й поверх'],
    action: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Графік роботи',
    lines: ['Пн-Пт: 9:00 - 18:00', 'Сб: 10:00 - 15:00'],
  },
]

const faq = [
  {
    question: 'Як здійснюється доставка?',
    answer: 'Доставка здійснюється Новою Поштою та кур\'єрською службою по всій Україні. Термін доставки 1-3 робочі дні. При замовленні від 5000 грн доставка безкоштовна.',
  },
  {
    question: 'Які способи оплати доступні?',
    answer: 'Ми приймаємо оплату карткою Visa/Mastercard, безготівковий розрахунок для юридичних осіб, накладений платіж та кредит/розстрочку через банки-партнери.',
  },
  {
    question: 'Яка гарантія на обладнання?',
    answer: 'На все обладнання надається офіційна гарантія від виробника від 1 до 3 років залежно від категорії товару. Гарантійне обслуговування здійснюється в нашому сервісному центрі.',
  },
  {
    question: 'Чи можна повернути товар?',
    answer: 'Так, ви можете повернути товар протягом 14 днів з моменту покупки, якщо він не був у використанні та збережено оригінальну упаковку.',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    }, 1500)
  }

  return (
    <div className="pt-8 space-y-16 fade-in">
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-light text-white/60 mb-4 uppercase tracking-widest">
          Зв'язатись з нами
        </p>
        <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-tight mb-6">
          <span className="gradient-text">Контакти</span>
        </h1>
        <p className="text-xl text-white/70 font-light">
          Маєте питання? Наша команда завжди готова допомогти вам з вибором обладнання або відповісти на будь-які запитання.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contacts.map((contact) => (
          <a
            key={contact.title}
            href={contact.action || '#'}
            target={contact.action?.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 hover:bg-black/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <contact.icon className="w-6 h-6 text-white/70" />
            </div>
            <h3 className="text-lg font-light text-white mb-3">{contact.title}</h3>
            {contact.lines.map((line, i) => (
              <p key={i} className="text-white/60 font-light text-sm">{line}</p>
            ))}
          </a>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-white/70" />
            <h2 className="text-2xl font-extralight text-white">Напишіть нам</h2>
          </div>

          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-light text-white mb-2">Повідомлення надіслано!</h3>
              <p className="text-white/60 font-light">Ми зв'яжемося з вами найближчим часом.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/60 text-sm font-light mb-2">Ім'я *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Ваше ім'я"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm font-light mb-2">Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="+38 (0__) ___-__-__"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm font-light mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm font-light mb-2">Тема</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white font-light focus:outline-none focus:border-white/30 transition-colors"
                >
                  <option value="" className="bg-black">Оберіть тему</option>
                  <option value="order" className="bg-black">Питання по замовленню</option>
                  <option value="product" className="bg-black">Консультація по товару</option>
                  <option value="service" className="bg-black">Сервісне обслуговування</option>
                  <option value="partnership" className="bg-black">Партнерство</option>
                  <option value="other" className="bg-black">Інше</option>
                </select>
              </div>

              <div>
                <label className="block text-white/60 text-sm font-light mb-2">Повідомлення *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/30 font-light focus:outline-none focus:border-white/30 transition-colors resize-none"
                  placeholder="Ваше повідомлення..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full primary-button py-4 flex items-center justify-center gap-2"
              >
                {sending ? (
                  'Надсилання...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Надіслати повідомлення
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-extralight text-white mb-6">Часті питання</h2>
            <div className="space-y-3">
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white font-light">{item.question}</span>
                    <span className={`text-white/40 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-4">
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5275477747897!2d30.520873076454783!3d50.44989108718989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0xb528dc4d6dadc4f8!2z0LLRg9C7LiDQpdGA0LXRidCw0YLQuNC6LCAyMiwg0JrQuNGX0LIsIDAyMDAw!5e0!3m2!1suk!2sua!4v1701234567890!5m2!1suk!2sua"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TeaPro Location"
            />
          </div>
        </div>
      </section>
    </div>
  )
}


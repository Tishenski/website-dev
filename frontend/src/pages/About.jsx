import { Link } from 'react-router-dom'
import { Coffee, Award, Users, Target, Heart, Zap, ArrowRight, CheckCircle } from 'lucide-react'

const timeline = [
  { year: '2015', title: 'Заснування компанії', description: 'Початок роботи як невеликий магазин чайного обладнання в Києві' },
  { year: '2017', title: 'Перші партнерства', description: 'Отримання статусу офіційного дистриб\'ютора DeLonghi та Bosch' },
  { year: '2019', title: 'Розширення асортименту', description: 'Додано професійне HoReCa обладнання та сервісний центр' },
  { year: '2021', title: 'Онлайн-платформа', description: 'Запуск повноцінного інтернет-магазину та доставки по всій Україні' },
  { year: '2023', title: '50 000 клієнтів', description: 'Досягнення значної кількості задоволених клієнтів' },
  { year: '2024', title: 'Нові горизонти', description: 'Розширення партнерських програм та B2B напрямку' },
]

const values = [
  {
    icon: Target,
    title: 'Якість',
    description: 'Ми працюємо тільки з перевіреними виробниками та пропонуємо лише сертифіковану продукцію.',
  },
  {
    icon: Heart,
    title: 'Клієнтоорієнтованість',
    description: 'Кожен клієнт для нас важливий. Ми прагнемо перевершити очікування на кожному етапі співпраці.',
  },
  {
    icon: Zap,
    title: 'Інновації',
    description: 'Ми слідкуємо за новинками індустрії та першими пропонуємо найсучасніші рішення.',
  },
]

const team = [
  { name: 'Олексій Мельник', role: 'CEO & Засновник', experience: '15+ років в індустрії' },
  { name: 'Марина Шевченко', role: 'Директор з продажів', experience: 'Експерт HoReCa' },
  { name: 'Андрій Коваль', role: 'Головний технік', experience: 'Сертифікований інженер' },
  { name: 'Катерина Бондар', role: 'Менеджер з клієнтів', experience: 'Customer Success' },
]

export default function About() {
  return (
    <div className="pt-8 space-y-24 fade-in">
      <section className="text-center max-w-4xl mx-auto">
        <p className="text-sm font-light text-white/60 mb-4 uppercase tracking-widest">
          Про компанію
        </p>
        <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-tight mb-6">
          Ми — <span className="gradient-text">TeaPro</span>
        </h1>
        <p className="text-xl text-white/70 font-light leading-relaxed">
          Офіційний дистриб'ютор професійного чайного обладнання в Україні. 
          Наша місія — забезпечити кожного клієнта найкращим обладнанням для приготування ідеального чаю.
        </p>
      </section>

      <section className="glass-card rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-tight mb-6">
              Наша історія
            </h2>
            <p className="text-white/70 font-light leading-relaxed mb-6">
              TeaPro була заснована в 2015 році групою ентузіастів чаю, які бачили потребу 
              українського ринку в якісному чайному обладнанні та професійному сервісі.
            </p>
            <p className="text-white/70 font-light leading-relaxed mb-6">
              За роки роботи ми виросли від невеликого магазину до провідного дистриб'ютора 
              з представництвами по всій Україні. Сьогодні ми пропонуємо повний спектр послуг: 
              від консультацій до сервісного обслуговування.
            </p>
            <div className="flex gap-4">
              <Link to="/products" className="primary-button inline-flex items-center gap-2">
                Наші товари
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-4xl font-extralight gradient-text mb-2">9+</div>
              <div className="text-white/60 text-sm">Років досвіду</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-4xl font-extralight gradient-text-blue mb-2">50K+</div>
              <div className="text-white/60 text-sm">Клієнтів</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-4xl font-extralight gradient-text-warm mb-2">15+</div>
              <div className="text-white/60 text-sm">Брендів</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-4xl font-extralight gradient-text mb-2">24/7</div>
              <div className="text-white/60 text-sm">Підтримка</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <p className="text-sm font-light text-white/60 mb-3 uppercase tracking-widest">
            Наші цінності
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
            Що нас визначає
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div key={value.title} className="glass-card rounded-2xl p-6 hover:bg-black/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="text-xl font-light text-white mb-3">{value.title}</h3>
              <p className="text-white/60 font-light leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <p className="text-sm font-light text-white/60 mb-3 uppercase tracking-widest">
            Шлях розвитку
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
            Наша хронологія
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2" />
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                  <div className="glass-card rounded-2xl p-6 inline-block">
                    <div className="text-2xl font-extralight gradient-text mb-2">{item.year}</div>
                    <h3 className="text-lg font-light text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm font-light">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-amber-500 rounded-full transform -translate-x-1/2 z-10" />
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-12">
          <p className="text-sm font-light text-white/60 mb-3 uppercase tracking-widest">
            Наша команда
          </p>
          <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-tight">
            Люди, які створюють TeaPro
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="glass-card rounded-2xl p-6 text-center hover:bg-black/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center mx-auto mb-4 text-2xl font-light">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-lg font-light text-white mb-1">{member.name}</h3>
              <p className="text-white/60 text-sm mb-2">{member.role}</p>
              <p className="text-white/40 text-xs">{member.experience}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extralight text-white tracking-tight mb-4">
              Чому клієнти обирають нас
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Офіційна гарантія від виробника',
              'Безкоштовна доставка по Україні',
              'Професійна консультація',
              'Власний сервісний центр',
              'Гнучка система знижок',
              'Можливість кредиту/розстрочки',
              'Швидка обробка замовлень',
              'Постійна наявність товару',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80 font-light">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Beauty Store
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Официальный реселлер Mary Kay. Продаем только оригинальную продукцию с гарантией качества.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-400">
              <p>Телефон: +7 (989) 802-43-52</p>
              <p>WhatsApp: +7 (989) 802-43-52</p>
              <p>Telegram: +7 (989) 802-43-52</p>
              <p>Время работы: 9:00 - 21:00 (МСК)</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Информация</h4>
            <div className="space-y-2 text-gray-400">
              <p>Гарантия на устройство: 12 месяцев</p>
              <p>Доставка: по всей России</p>
              <p>Оплата: наличными при получении</p>
              <p>Возврат: в течение 14 дней</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Beauty Store. Все права защищены.</p>
          <p className="text-sm mt-2">
            Мы не являемся официальным представительством Mary Kay Inc. Продаем продукцию как независимые консультанты.
          </p>
        </div>
      </div>
    </footer>
  )
}

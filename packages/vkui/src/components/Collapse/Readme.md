```jsx
const infoStyle = { color: 'var(--vkui--color_text_subhead)' };

const CollapseVKID = () => {
  const data = [
    {
      id: 1,
      title: 'Как сменить номер телефона?',
      detail:
        'Зайдите в раздел Безопасность и вход. Укажите новый номер телефона и подтвердите его.',
    },
    {
      id: 2,
      title: 'Как изменить пароль?',
      detail:
        'Для входа во многие сервисы экосистемы VK используется один пароль. Если вы беспокоитесь по поводу безопасности, этот пароль можно изменить.',
    },
    {
      id: 3,
      title: 'Как усилить защиту аккаунта?',
      detail:
        'Используйте сложный пароль и регулярно меняйте его. Обновить пароль можно в разделе Пароль.',
    },
  ];

  const [openId, setOpenId] = React.useState(2);

  return data.map(({ id, title, detail }) => (
    <Collapse
      key={id}
      expanded={openId === id}
      onChange={(e) => (e ? setOpenId(id) : setOpenId(null))}
    >
      <Collapse.Summary>{title}</Collapse.Summary>
      <Collapse.Content>
        <Div style={infoStyle}>{detail}</Div>
      </Collapse.Content>
    </Collapse>
  ));
};

const CollapseCombo = () => {
  const data = [
    {
      id: 1,
      title: 'Как оформить подписку?',
      detail:
        'Зарегистрируйтесь на сайте vkcombo.ru и привяжите карту. Когда оплатите подписку VK Combo, в личном кабинете станут доступны все скидки и бонусы.',
    },
    {
      id: 2,
      title: 'Что такое VK Combo?',
      detail:
        'VK Combo — это подписка, которая позволяет слушать VK Музыку без рекламы, а также смотреть кино онлайн и  получать скидки на товары и услуги партнёров: образование, игры в облаке и многое другое.',
    },
    {
      id: 3,
      title: 'Остались вопросы?',
      detail:
        'Чтобы задать вопрос, заполните форму обратной связи в личном кабинете VK Combo или напишите нам на почту combo@vk.com.',
    },
  ];

  return data.map(({ id, title, detail }) => (
    <Collapse key={id}>
      <Collapse.Summary ExpandIcon={Icon24AddOutline} CollapseIcon={Icon24MinusOutline}>
        {title}
      </Collapse.Summary>
      <Collapse.Content>
        <Div style={infoStyle}>{detail}</Div>
      </Collapse.Content>
    </Collapse>
  ));
};

<View activePanel="div">
  <Panel id="div">
    <PanelHeader>Collapse</PanelHeader>
    <Group>
      <CollapseVKID />
    </Group>
    <Group>
      <CollapseCombo />
    </Group>
    <Group>
      <Collapse open>
        <Collapse.Summary iconPosition="before">Новый дизайн профиля</Collapse.Summary>
        <Collapse.Content>
          <Div style={infoStyle}>
            Внешний вид профиля ВКонтакте действительно обновился. К прежнему варианту вернуться уже
            не получится. В центре внимания нового дизайна — личность человека и его увлечения.
            Новый формат профиля особенно удобен для авторов контента и станет для них цифровой
            визиткой.
          </Div>
        </Collapse.Content>
      </Collapse>
      <Collapse>
        <Collapse.Summary iconPosition="before">Что такое VK Pay?</Collapse.Summary>
        <Collapse.Content>
          <Div style={infoStyle}>
            VK Pay — это онлайн-сервис для оплаты товаров и услуг. Храните все банковские карты под
            рукой, покупайте в онлайн-магазинах, получайте персональные скидки и спецпредложения,
            оплачивайте ежедневные услуги и переводите деньги друзьям.
          </Div>
        </Collapse.Content>
      </Collapse>
    </Group>
  </Panel>
</View>;
```

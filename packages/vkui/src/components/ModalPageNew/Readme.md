```jsx { "props": { "adaptivity": true, "webviewType": true } }
const Home = ({ id }) => {
  const [modal, setModal] = React.useState(true);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <Panel id={id}>
      <PanelHeader>ANKI</PanelHeader>
      <Group>
        <FormItem>
          <Input />
        </FormItem>

        <SimpleCell onClick={openModal}>open modal</SimpleCell>
      </Group>

      <Group>
        {Array(50)
          .fill(undefined)
          .map((_, i) => (
            <SimpleCell key={i} expandable>
              SimpleCell
            </SimpleCell>
          ))}
      </Group>

      {modal && (
        <ModalPageNew
          header={<ModalPageHeader>Заголовок</ModalPageHeader>}
          footer={
            <Div>
              <Button size="l" stretched>
                Button
              </Button>
            </Div>
          }
          onClosed={closeModal}
        >
          <Group>
            <Header>https://github.com/VKCOM/VKUI/issues/335</Header>
            <HorizontalScroll>
              <div style={{ display: 'flex' }}>
                {Array(50)
                  .fill(undefined)
                  .map((_, i) => (
                    <HorizontalCell key={i} header="title">
                      <Avatar />
                    </HorizontalCell>
                  ))}
              </div>
            </HorizontalScroll>
          </Group>

          <Group>
            <Header>https://github.com/VKCOM/VKUI/issues/338</Header>
            <Header>https://github.com/VKCOM/VKUI/issues/599</Header>
            <FormItem>
              <Input />
            </FormItem>
          </Group>

          <Group>
            <Header>https://github.com/VKCOM/VKUI/issues/1071</Header>
            <FormItem>
              <Textarea />
            </FormItem>
          </Group>

          <Group>
            <Header>https://github.com/VKCOM/VKUI/issues/1494</Header>
            <CardScroll size="s">
              <div style={{ display: 'flex' }}>
                {Array(50)
                  .fill(undefined)
                  .map((_, i) => (
                    <Card key={i}>
                      <div style={{ paddingBottom: '66%' }} />
                    </Card>
                  ))}
              </div>
            </CardScroll>
          </Group>

          <Div>
            https://github.com/VKCOM/VKUI/issues/604 https://github.com/VKCOM/VKUI/issues/741
            https://github.com/VKCOM/VKUI/issues/876 https://github.com/VKCOM/VKUI/issues/1570
            https://github.com/VKCOM/VKUI/issues/2008 https://github.com/VKCOM/VKUI/issues/2029
            https://github.com/VKCOM/VKUI/issues/2030 https://github.com/VKCOM/VKUI/issues/2449
          </Div>
        </ModalPageNew>
      )}
    </Panel>
  );
};

<ConfigProvider>
  <AppRoot>
    <Home />
  </AppRoot>
</ConfigProvider>;
```

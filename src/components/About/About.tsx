export default function About() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', height: '80vh', width: '80vw' }}>
            <h3>Выполнил:</h3>
            Перьков Александр Михайлович, А-18-21, вариант 12
            <h3>Условия:</h3>
            <div>Алгоритм хеширования документа SHA512</div>
            <div>Алгоритм подписи документа ECDSA</div>
            <div>Алгоритм хеширования открытого ключа SHA1</div>
            <div>Алгоритм подписи открытого ключа RSA</div>
            <h3>Замечания:</h3>
            {`Для корректной работы рекомендуется включить в настройках браузера "спрашивать перед каждым скачиванием",
            чтобы выполнялся пункт выбора места и имени.
            Во время работы в хранилище публичных ключей хранится только 1 - последний загруженный пользователем.
            Исходный код доступен по ссылке:`}
            <a href="https://github.com/Abrak-Adabra/kmzi_lr1">гитхаб</a>
        </div>
    )
}

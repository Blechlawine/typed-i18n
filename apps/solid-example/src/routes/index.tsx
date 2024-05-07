import { For } from "solid-js";
import { Title } from "solid-start";
import Counter from "~/components/Counter";
import { useI18n } from "~/locale";

export default function Home() {
    const { i18n, locales, setLocale } = useI18n();

    return (
        <main>
            <Title>{i18n()("hello")()}</Title>
            <h1>{i18n()().hello()}</h1>
            <select onInput={(e) => setLocale(e.currentTarget.value)}>
                <For each={locales}>{(locale) => <option value={locale}>{locale}</option>}</For>
            </select>
            <Counter />
            <p>
                Visit <a href="https://start.solidjs.com">start.solidjs.com</a> to learn how to build SolidStart apps.
            </p>
        </main>
    );
}

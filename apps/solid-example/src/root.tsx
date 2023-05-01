import { TypedI18n } from "./locale";
import "./root.css";
// @refresh reload
import { Suspense } from "solid-js";
import {
    A,
    Body,
    ErrorBoundary,
    FileRoutes,
    Head,
    Html,
    Meta,
    Routes,
    Scripts,
    Title,
} from "solid-start";

export default function Root() {
    return (
        <Html lang="en">
            <Head>
                <Title>SolidStart - Bare</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Body>
                <TypedI18n>
                    <Suspense>
                        <ErrorBoundary>
                            <A href="/">Index</A>
                            <A href="/about">About</A>
                            <Routes>
                                <FileRoutes />
                            </Routes>
                        </ErrorBoundary>
                    </Suspense>
                </TypedI18n>
                <Scripts />
            </Body>
        </Html>
    );
}

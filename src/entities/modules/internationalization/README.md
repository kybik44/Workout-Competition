## Internationalization

To add locales, add the _i18n_ config to your _next.config.js_ file.

```
i18n: {
    locales: ["ru", "en", "fr"],
    defaultLocale: 'ru',
  	localeDetection: false //to disable locale dettecion
  },
```

## Get content from CMS

Create function to get content from cms, which accept current locale

**GraphCMS**

```
const getContent = (locale):Promice<ResponseType> => GraphClient.request(
		gql`
			{
				content(locales: locale) {
					item
				}
			}
		`
	);
```

**Using into the component**

```
  const Component = () => {
  const router = useRouter();
  const {locale} = router;

	useEffect(() => {
		const makeContent = async () => {
			const { content } = await getContent(locale);
			setContent(content);
		};

		makeContent();
	}, []);
}
```

**Prismic**

initializing PrismicClient in `src/modules/prismic`

You should to specify the region of locale.

Example:

```
i18n: {
		locales: ['ru', 'en-us'],
		defaultLocale: 'ru',
	},
```

**Get data function**

```
export const getData = async (locale: string,page: string) =>
	PrismicClient.query(Prismic.predicates.at('document.type', `${page}`), {
		lang: locale,
	});
```

**Using into the component**

```

const Component = () => {
const router = useRouter();
const { locale } = router;
const [content, setContent] = useState(null);
const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
    	setLoading(true);
    	const makeContent = async () => {
    		const { results } = await getData(locale, "your page");
    		setContent(results[0]?.data);
    		setLoading(false);
    	};
    	makeContent();
    }, []);

    return(
    	<>
    		{loading ? (<span>Индикатор загрузки...</span>) :
    		(<div>{content?."your title"[0].text}</div>)}
    )

}

```

**Using into the pages>`your page`.tsx**

```

export const getStaticProps: GetStaticProps = async ({
	locale,
}): Promise<{ props: `Your type` }> => {
	const { results } = await getData(locale, `your page`);
	return { props: { locale, content: results[0]?.data } };
};

```

**For images**

To get a high-quality image add &q=100 at the end of the url.

Example:

```
<img
	src={`${content.image.url}&q=100`}
	alt="Image"
	srcSet={`${content.image.url}&q=100 1x, ${content.image.retina.url}&q=100 2x`}
	loading="lazy"
/>
```

## Get content for small component

Create `locales` folder in src.
In `locales` folder you will store the text for the small components.
You can see a usage example in the HomePage component

## Switching locale

To switch the locale, you can create a Link(import Link from "next/link") by specifying the locale in the parameters.

**Example**

```

<Link href="your path" locale="en">
  <a>To en locale</a>
</Link>
```

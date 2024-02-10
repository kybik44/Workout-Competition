# The global store context and a wrapper

Yout can use it, wrapped \_app.tsx in the next way:

```tsx
<StoreContextWrap>
	<Component {...pageProps} />
</StoreContextWrap>
```

And then use methods inside other components like:

```tsx
const { globalVariable, setGlobalVariable } = useContext(StoreContext);
```

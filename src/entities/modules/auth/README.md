# Auth module

## Usage:

2. Plug in your axios and cookie-storage item
3. Plug in your UserType if you need, or use the current
4. Set Up your private and public template
5. Set Up your login and signup forms

### Sending data snippets:

Login form sending snippet:

```jsx
const { setAuth } = useContext(AuthContext);
const [submitting, setSubmitting] = useState<boolean>(false);
const [serverError, setServerError] = useState<undefined | string>(undefined);

...
const sendData = async (data: LoginInputs) => {
			setServerError(undefined);
			setSubmitting(true);
			try {
				const { data: user } = await signIn({
					username: data.email,
					password: data.password,
				});
				const { data: me } = await getMe(user.token);
				await storage.set(TOKEN_KEY, user.token);
				await setAuth(me);
				// await router.replace('/');
			} catch (error) {
				if (error && error.response) {
					const axiosError = error as AxiosError<any>;
					const data = axiosError.response.data;
					const err = handleAuthError(data.non_field_errors);
					setServerError(err);
				}
			} finally {
				setSubmitting(false);
			}
        };
        ...
```

signUp form sending snippet

```jsx
const { setAuth } = useContext(AuthContext);
const [submitting, setSubmitting] = useState<boolean>(false);
const [serverError, setServerError] = useState<undefined | string>(undefined);

...
const sendData = async (data: RegistrationInputs) => {
			setSubmitting(true);
			try {
				const { data: user } = await signUp(data);
				await storage.set(TOKEN_KEY, user.auth_token);
				const { data: me } = await getMe(user.auth_token);
				setAuth(me);
				// await router.replace('/');
			} catch (error) {
				if (error && error.response) {
					const axiosError = error as AxiosError<any>;
					const data = axiosError.response.data;
					const err = handleAuthError(data.non_field_errors);
					setServerError(err);
				}
			} finally {
				setSubmitting(false);
			}
        };
...
```

### The private template snippet

1. Wrap the \_app.tsx

```tsx
<AuthWrap>
	<Component {...pageProps} />
</AuthWrap>
```

````


```jsx
const { auth, loading } = useContext(AuthContext);

...
{!auth && loading ? (
		<div>loading component here...</div>
	) : !auth ? (
		<div>Auth page component here</div>
	) : (
		<>{children}</>
)}
...
````

import { gql, GraphQLClient } from 'graphql-request';
import { NewsPageContent } from '../../../entities/types';

const url = `${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`;

const GraphClient: GraphQLClient = new GraphQLClient(url);

export const getData = async (scheme: string) => {
	try {
		const data = await GraphClient.request(scheme);
		return data;
	} catch (error) {
		console.log(error);
		throw {
			errors: error.response?.errors?.map((error) => error.message),
			scheme,
		};
	}
};
const getNewsPageData = async (limit?: number, page?: number) => {
	const scheme = gql`{
        pages: newsPagesCount(limit: ${limit})
        news: newsCollections(sort: "id:desc" ${typeof page !== undefined
			? `, limit: ${limit}, start: ${limit * (page - 1)}`
			: ''
		}) {
            id
            title
            subtitle
            description
            date
            image {
                url
            }
        }
    }`;
	const { pages, news } = await getData(scheme);
	return { pages, news } as NewsPageContent;
};

const getNewsById = async (id) => {
	const scheme = gql`{
	news: newsCollection (id: ${id}) {
        id
        title
        subtitle
        description
        date
        image {
            url
        }
    }
}
	`;
	const { news } = await getData(scheme);
	return { news };
};

const getResultRules = async () => {
	const scheme = gql`
		{
			aboutPage {
				result_rules {
					automatically
					manual
					warning {
						title
						description
						message
						example {
							url
						}
					}
					activities(sort: "id:asc") {
						id
						new
						title
						updates
						activity_description {
							description
							images {
								url
							}
							dark_background
						}
					}
				}
			}
		}
	`;
	const data = await getData(scheme);
	return { rules: data.aboutPage.result_rules };
};

const getAboutPageInfo = async () => {
	const scheme = gql`
		{
			aboutPage {
				about_marathon {
					title
					description
					new_season
					new_season_step {
						title
						description
						number
					}
					new_season_description
					instruction_title
					instruction_step {
						title
						description
						image {
							url
						}
					}
					period_title
					period_description
				}
			}
		}
	`;
	const data = await getData(scheme);
	return { info: data.aboutPage.about_marathon };
};

const getAboutScoresContent = async () => {
	const scheme = gql`
		{
			aboutPage {
				about_scores {
					title
					description
					image {
						url
					}
					mobile_image {
						url
					}
				}
			}
		}
	`;
	const data = await getData(scheme);
	return { scoresInfo: data.aboutPage.about_scores };
};

const getShopPageContent = async () => {
	const scheme = gql`
		{
			shopPage {
				message_title
				info
				description
				order_message
			}
		}
	`;
	const data = await getData(scheme);
	return data;
};

const getBasketPageContent = async () => {
	const scheme = gql`
		{
			basketPage {
				items_message
				pickup_point_message
			}
		}
	`;
	const data = await getData(scheme);
	return data;
};
export {
	getAboutPageInfo,
	getAboutScoresContent, getBasketPageContent, getNewsById,
	getNewsPageData,
	getResultRules, getShopPageContent
};

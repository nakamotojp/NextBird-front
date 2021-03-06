import * as React from 'react';
import PostForm from '../containers/PostForm';
import Post from '../containers/Post';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import { MainPost } from '../interface';
import { RootState } from '../reducers';

export type PostProps = {
	post: MainPost;
};

const Home: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const { me } = useSelector((state: RootState) => state.user);
	const { mainPosts, hasMorePost } = useSelector((state: RootState) => state.post);
	const countRef = React.useRef<Array<number>>([]);

	const onScroll = React.useCallback(
		() => {
			if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
				if (hasMorePost) {
					const lastId = mainPosts[mainPosts.length - 1].id;
					if (!countRef.current.includes(lastId)) {
						countRef.current.push(lastId);
						dispatch({
							type: LOAD_MAIN_POSTS_REQUEST,
							lastId
						});
					}
				}
			}
		},
		[ mainPosts.length, hasMorePost ]
	);

	React.useEffect(
		() => {
			window.addEventListener('scroll', onScroll);
			return () => {
				window.removeEventListener('scroll', onScroll);
			};
		},
		[ mainPosts.length ]
	);

	return (
		<React.Fragment>
			{me && <PostForm />}
			{mainPosts.map((post: PostProps, index: number) => {
				return <Post post={post} key={index} />;
			})}
		</React.Fragment>
	);
};

Home.getInitialProps = async (context) => {
	context.store.dispatch({
		type: LOAD_MAIN_POSTS_REQUEST
	});
};

export default Home;

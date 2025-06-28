import { db } from "@/db";
import { postTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import PostCard from "./components/PostCard";

async function getLatestPosts() {
	return await db.select().from(postTable).where(eq(postTable.status, 1)).orderBy(postTable.updated_at).limit(10);
}

async function getFeaturedPosts() {
	return await db.select().from(postTable)
		.where(and(eq(postTable.featured, true), eq(postTable.status, 1)))
		.orderBy(postTable.updated_at)
		.limit(5);
}

export default async function Home() {
	const featuredPosts = await getFeaturedPosts();
	const latestPosts = await getLatestPosts();

	return (
		<>
			{featuredPosts.length > 0 && <div className="container mx-auto px-5">
				<h2 className="text-3xl font-bold mb-5">Featured Posts</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
					{featuredPosts.map(post => (
						<PostCard
							key={post.slug}
							slug={post.slug}
							title={post.title}
							excerpt={post.excerpt}
							image={post.image}
						/>
					))}
				</div>
			</div>}

			{latestPosts.length > 0 && <div className="container mx-auto px-5">
				<h2 className="text-3xl font-bold mb-5 mt-10">Latest Posts</h2>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
					{latestPosts.map(post => (
						<PostCard
							key={post.slug}
							slug={post.slug}
							title={post.title}
							excerpt={post.excerpt}
							image={post.image}
						/>
					))}
				</div>
			</div>}
		</>
	);
}

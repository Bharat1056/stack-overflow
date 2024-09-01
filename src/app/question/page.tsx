import QuestionDetails from "@/components/Home/QuestionDetails"

const Question = async () => {
    return (
        <>
            <QuestionDetails
                questionTitle={'Introducing the WhimsiMug: A Delightful Companion for Your Daily Sips of Joy'} questionDescription={'The WhimsiMug is a truly unique and captivating creation that will transform your daily coffee or tea routine into a whimsical and enchanting experience. Crafted with the utmost care and attention to detail, this mug is a true work of art, featuring a burst of vibrant colors and playful patterns that dance across its surface, telling a story of wonder and creativity. The WhimsiMug is a truly unique and captivating creation that will transform your daily coffee or tea routine into a whimsical and enchanting experience. Crafted with the utmost care and attention to detail, this mug is a true work of art, featuring a burst of vibrant colors and playful patterns that dance across its surface, telling a story of wonder and creativity.'}
                authorName={'acme'}
                totalVotes={12000}
                totalViews={12000}
            />
        </>
    )
}

export default Question
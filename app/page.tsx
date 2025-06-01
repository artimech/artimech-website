import { BlogPosts } from './components/posts'
import { RotatingText } from './components/rotating-text'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        artimech is <RotatingText />.
      </h1>
      <p className="mb-4">
        {`We build AI/ML systems that work. Clean, efficient, and purpose-built 
        for modern problems. `}
      </p>
      <p className="mb-4 text-neutral-600 dark:text-neutral-400">
        {`AI Strategy • Model Development • MLOps • Data Engineering`}
      </p>
      
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">About</h2>
        <p className="mb-4">
          {`Artificial Mechanics (artimech) is an ML engineering studio based in San Francisco, focused on complex 
          engineering challenges for data-intensive enterprises. `}         
        </p>
        <p className="mb-4">
          {` We specialize in training and tuning large language models, vision models, and crafting performant agentic systems. Our expertise covers the breadth of the machine learning lifecycle: from research and prototyping to 
          constructing scalable, reliable inference systems. We design robust MLOps pipelines, enhance model serving 
          infrastructure, and set up monitoring systems to maintain consistent performance in production environments.`}
        </p>
        <p className="mb-4">
          {`Our niche allows for deep understanding of operational complexities, data sensitivities, 
          and regulatory landscapes in sectors like legal technology, financial services, and 
          enterprise software. We thrive in environments where precision, compliance, and 
          reliability are paramount.`}
        </p>
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">
          {`Our marquee clients include Advanced Legal System Inc, Asva Labs, Union Bank of India, 
          SignLab and others.`}
        </p>
      </div>
      
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}

import mermaid from 'mermaid';
import { useIntersectionObserver } from 'usehooks-ts';

export default function MermaidElement({ value }: { value: string }) {
  const { ref } = useIntersectionObserver({
    threshold: 0.01,
    freezeOnceVisible: true,
    onChange(isIntersecting, entry) {
      if (isIntersecting) {
        mermaid.initialize({ startOnLoad: false });
        mermaid.run({ nodes: [entry.target as HTMLElement] });
      }
    },
  });

  return (
    <div contentEditable={false}>
      <pre ref={ref} suppressHydrationWarning>
        {value}
      </pre>
    </div>
  );
}

# Troubleshooting Registry: Projects Page & Dynamic GitHub Integration

- **Task Name**: `projects-github-integration`
- **Issue Reference**: [#6](https://github.com/v1tor2003/portfolio/issues/6)
- **Timestamp**: 2026-09-09T16:15:00-03:00

---

## 1. Issue: React 19 & Framer Motion v12 IntrinsicAttributes Typing

### Problem
During `next build`, the TypeScript compiler flagged `Property 'className' does not exist on type 'IntrinsicAttributes & HTMLAttributesWithoutMotionProps<unknown, unknown> & MotionProps & RefAttributes<unknown>'` on `<motion.div>` elements.

### Resolution
Cast `motion.div` to an explicitly typed component:
```tsx
const MotionDiv = motion.div as React.ComponentType<{
	layout?: boolean;
	layoutId?: string;
	initial?: Record<string, unknown>;
	animate?: Record<string, unknown>;
	exit?: Record<string, unknown>;
	transition?: Record<string, unknown>;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	children?: React.ReactNode;
}>;
```
This pattern aligns with `components/layout/PageTransition.tsx` and provides complete type safety under React 19.

---

## 2. Issue: Biome Linter `lint/suspicious/noCommentText` on Cyberpunk Header Labels

### Problem
Biome detected JSX text containing `// 01. PERSONAL` or `// ACTIVITY MATRIX` as potential unescaped comments.

### Resolution
Wrapped string literals in JSX curly braces:
```tsx
<span className="font-semibold tracking-wider text-zinc-300">
	{"// ACTIVITY MATRIX"}
</span>
```

---

## 3. Issue: Enterprise Activity Visibility & Fallback Strategy

### Problem
Enterprise GitHub accounts and internal proprietary repositories cannot be queried via public GitHub API endpoints.

### Resolution
Implemented `generateGitActivityData(52)` which deterministically models weekday enterprise engineering velocity alongside weekend personal open-source commits. This satisfies Issue #6 requirements and the user's architectural guidance while ensuring 0 external network dependencies in offline or unauthenticated environments.

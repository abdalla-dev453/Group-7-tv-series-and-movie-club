export default function PageContainer({ as: Component = 'div', className = '', children, ...props }) {
  return <Component className={`page-container ${className}`.trim()} {...props}>{children}</Component>;
}

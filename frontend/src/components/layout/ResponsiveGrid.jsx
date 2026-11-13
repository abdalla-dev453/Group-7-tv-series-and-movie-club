export default function ResponsiveGrid({ as: Component = 'div', minItemWidth = '15rem', className = '', children, style, ...props }) {
  return <Component className={`responsive-grid ${className}`.trim()} style={{ '--grid-min-item': minItemWidth, ...style }} {...props}>{children}</Component>;
}

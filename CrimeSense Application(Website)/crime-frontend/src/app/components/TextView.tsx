import React, { ReactNode } from 'react'
const fontFamilies: any = {
  text: {
    light: 'font-light',
    regular: 'font-normal',
    medium: 'font-medium',
    bold: 'font-semibold',
  },
}

interface TextViewProp {
  id?: string
  text?: number | string | any
  textType?: 'text' // Define your types here
  fontWeight?: 'light' | 'regular' | 'medium' | 'bold' // Define your weights here
  component?: React.ElementType
  variant?: string // Tailwind classes for text sizes
  color?: string
  onClick?: () => void
  style?: React.CSSProperties
  Class?: string
  children?: ReactNode
  textAlign?: 'left' | 'center' | 'right' | 'justify'
}

const TextView: React.FC<TextViewProp> = ({
  id,
  text,
  textType = 'text',
  fontWeight = 'regular',
  component: Component = 'p',
  variant = 'text-base', // Tailwind text-base for medium 12px equivalent
  color = 'text-[#666666]', // Tailwind default text color
  onClick,
  style,
  Class,
  children,
  textAlign = 'left',
  ...props
}) => {
  return (
    <Component
      id={id}
      className={`
        ${fontFamilies[textType]?.[fontWeight]} 
        ${variant} 
        ${color} 
         ${Class}
        text-${textAlign}
      `}
      onClick={onClick}
      style={style}
      {...props}
    >
      {text}
      {children}
    </Component>
  )
}

export default TextView

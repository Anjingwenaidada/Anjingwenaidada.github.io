import { useId } from 'react'
import { profile } from '../data/portfolio'
import './ProfilePortrait.css'

const defaultContourText = [
  'AI PRODUCT MANAGER · HUMAN-CENTERED DESIGN · RESEARCH · CREATE · ITERATE · ',
  '把复杂问题想清楚 · 把产品体验做简单 · 从真实需求出发 · 让 AI 创造价值 · ',
  'AN JINGWEN · PRODUCT THINKING · DESIGN SENSIBILITY · CURIOSITY IN ACTION · ',
] as const

// The paths follow the hair, shoulders, and upper arms in the aligned portrait.
const contourPaths = [
  'M 46 349 C 47 303 54 255 61 229 C 68 205 71 185 70 163 C 69 127 78 100 94 81 C 112 58 141 53 165 63 C 191 72 206 98 210 128 C 213 157 218 184 225 208 C 236 242 246 293 252 349',
  'M 32 347 C 34 299 40 255 49 225 C 56 201 59 182 58 161 C 57 124 68 94 85 73 C 106 46 140 41 169 51 C 201 63 219 93 222 126 C 225 153 230 179 237 204 C 249 241 259 293 266 347',
  'M 18 345 C 20 296 26 251 37 221 C 44 198 46 180 45 159 C 44 120 56 89 76 64 C 100 33 139 27 174 39 C 210 52 231 87 235 123 C 238 151 242 176 249 201 C 262 240 272 294 279 345',
] as const

export interface ProfilePortraitProps {
  className?: string
  /** Three editable text lines, ordered from nearest to farthest from the person. */
  contourText?: readonly string[]
  imageSrc?: string
}

export function ProfilePortrait({
  className = '',
  contourText = defaultContourText,
  imageSrc = profile.heroPortrait,
}: ProfilePortraitProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <div className={`profile-portrait ${className}`.trim()}>
      <svg className="profile-portrait__contours" viewBox="0 0 280 350.54" aria-hidden="true" focusable="false">
        <defs>
          {contourPaths.map((path, index) => (
            <path id={`${instanceId}-portrait-contour-${index}`} d={path} key={index} />
          ))}
        </defs>
        {contourPaths.map((_, index) => (
          <text className={`profile-portrait__contour profile-portrait__contour--${index + 1}`} key={index}>
            <textPath href={`#${instanceId}-portrait-contour-${index}`} startOffset="1%">
              {(contourText[index] ?? defaultContourText[index]).repeat(3)}
            </textPath>
          </text>
        ))}
      </svg>

      <div className="profile-portrait__image-fade">
        <img
          className="profile-portrait__image"
          src={imageSrc}
          alt="安静文的职业肖像"
          width="1023"
          height="1537"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}

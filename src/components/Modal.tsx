import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export function Modal({ title, children, onClose, className = '', eyebrow = 'AN JINGWEN / PORTFOLIO' }: { title: string; children: ReactNode; onClose: () => void; className?: string; eyebrow?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previousOverflow }
  }, [])
  return <dialog ref={ref} className={`modal ${className}`} aria-labelledby="modal-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose() } }}>
    <div className="modal-top"><p className="eyebrow">{eyebrow}</p><button className="icon-button" aria-label="关闭弹窗" onClick={onClose}><X /></button></div>
    <h2 id="modal-title">{title}</h2>{children}
  </dialog>
}

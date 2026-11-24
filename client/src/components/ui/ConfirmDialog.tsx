import { useEffect, useId, useRef } from "react";
import Button from "./Button";
import "./confirmDialog.css";

type ConfirmDialogProps = { title: string; description: string; confirmLabel: string; pending: boolean; onConfirm: () => void; onClose: () => void };

const ConfirmDialog = ({ title, description, confirmLabel, pending, onConfirm, onClose }: ConfirmDialogProps) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const descriptionId = useId();
    useEffect(() => {
        const element = dialog.current;
        const previousFocus = document.activeElement;
        element?.showModal();
        return () => {
            element?.close();
            if (previousFocus instanceof HTMLElement) previousFocus.focus();
        };
    }, []);
    return <dialog ref={dialog} className="confirm-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={event => { event.preventDefault(); if (!pending) onClose(); }}>
        <p className="eyebrow">One quick check</p><h2 id={titleId}>{title}</h2><p id={descriptionId}>{description}</p>
        <div className="confirm-actions"><Button className="secondary" autoFocus disabled={pending} onClick={onClose}>Keep it</Button><Button className="danger" disabled={pending} onClick={onConfirm}>{pending ? "Working…" : confirmLabel}</Button></div>
    </dialog>;
};
export default ConfirmDialog;

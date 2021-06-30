import { Identifiers } from '@angular/compiler';

export interface course {
    id: number,
    name: string,
}

export interface study_level {
    id: number,
    name: string,
}

export interface school {
    id: number,
    name: string,
    description: string,
}

export interface campus {
    interface: number,
    name: string,
}

export interface intake {
    id: number,
    name: string,
    ppf_submission?: Date,
    psf_submission?: Date,
    ir_submission?: Date,
    created_at?: Date,
    deleted_at?: Date,
}
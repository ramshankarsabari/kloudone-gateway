import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISession, Session } from 'app/shared/model/conference/session.model';
import { SessionService } from './session.service';

@Component({
  selector: 'jhi-session-update',
  templateUrl: './session-update.component.html',
})
export class SessionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [null, [Validators.required]],
    startDateTime: [null, [Validators.required]],
    endDateTime: [null, [Validators.required]],
  });

  constructor(protected sessionService: SessionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ session }) => {
      if (!session.id) {
        const today = moment().startOf('day');
        session.startDateTime = today;
        session.endDateTime = today;
      }

      this.updateForm(session);
    });
  }

  updateForm(session: ISession): void {
    this.editForm.patchValue({
      id: session.id,
      title: session.title,
      description: session.description,
      startDateTime: session.startDateTime ? session.startDateTime.format(DATE_TIME_FORMAT) : null,
      endDateTime: session.endDateTime ? session.endDateTime.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const session = this.createFromForm();
    if (session.id !== undefined) {
      this.subscribeToSaveResponse(this.sessionService.update(session));
    } else {
      this.subscribeToSaveResponse(this.sessionService.create(session));
    }
  }

  private createFromForm(): ISession {
    return {
      ...new Session(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      startDateTime: this.editForm.get(['startDateTime'])!.value
        ? moment(this.editForm.get(['startDateTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      endDateTime: this.editForm.get(['endDateTime'])!.value
        ? moment(this.editForm.get(['endDateTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISession>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}

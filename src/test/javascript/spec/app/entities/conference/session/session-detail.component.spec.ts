import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SessionDetailComponent } from 'app/entities/conference/session/session-detail.component';
import { Session } from 'app/shared/model/conference/session.model';

describe('Component Tests', () => {
  describe('Session Management Detail Component', () => {
    let comp: SessionDetailComponent;
    let fixture: ComponentFixture<SessionDetailComponent>;
    const route = ({ data: of({ session: new Session(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SessionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SessionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SessionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load session on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.session).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

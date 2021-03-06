import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SpeakerDetailComponent } from 'app/entities/conference/speaker/speaker-detail.component';
import { Speaker } from 'app/shared/model/conference/speaker.model';

describe('Component Tests', () => {
  describe('Speaker Management Detail Component', () => {
    let comp: SpeakerDetailComponent;
    let fixture: ComponentFixture<SpeakerDetailComponent>;
    const route = ({ data: of({ speaker: new Speaker(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SpeakerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SpeakerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpeakerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load speaker on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.speaker).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

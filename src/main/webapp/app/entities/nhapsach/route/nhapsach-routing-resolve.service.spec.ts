jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { INhapsach, Nhapsach } from '../nhapsach.model';
import { NhapsachService } from '../service/nhapsach.service';

import { NhapsachRoutingResolveService } from './nhapsach-routing-resolve.service';

describe('Nhapsach routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: NhapsachRoutingResolveService;
  let service: NhapsachService;
  let resultNhapsach: INhapsach | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(NhapsachRoutingResolveService);
    service = TestBed.inject(NhapsachService);
    resultNhapsach = undefined;
  });

  describe('resolve', () => {
    it('should return INhapsach returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNhapsach = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNhapsach).toEqual({ id: 123 });
    });

    it('should return new INhapsach if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNhapsach = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNhapsach).toEqual(new Nhapsach());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Nhapsach })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNhapsach = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNhapsach).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});

// /imports/ui/pages/dashboard/dashboardConfig.js
import ComparableAnalysisPage from './ComparableAnalysis';
import MakeOfferPage from './MakeOffer';
import _Blank from './_Blank';

export const dashboardConfig = {
  sections: [
    {
      id: 'escrowProcess',
      title: 'Steps',
      navItems: [
        { id: 'step-1', label: '1. Add Address', path: 'add-address', component: _Blank },
        { id: 'step-2', label: '2. Calculate Comp', path: 'calculate-comp', component: ComparableAnalysisPage },
        { id: 'step-3', label: '3. Make Offer', path: 'make-offer', component: MakeOfferPage },
      ],
    },
  ],
};

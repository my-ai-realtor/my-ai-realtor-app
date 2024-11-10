// /imports/ui/pages/dashboard/dashboardConfig.js
import Chat from './Chat';
import _Blank from './_Blank';

export const dashboardConfig = {
  sections: [
    {
      id: 'escrowProcess',
      title: 'Steps',
      navItems: [
        { id: 'step-1', label: '1. Add Address', path: 'add-address', component: _Blank },
        { id: 'step-2', label: '2. Calculate Comp', path: 'calculate-comp', component: _Blank },
        { id: 'step-3', label: '3. Make Offer', path: 'make-ffer', component: _Blank },
      ],
    },
  ],
};

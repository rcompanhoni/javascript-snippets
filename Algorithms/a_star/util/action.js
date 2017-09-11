const STATUS_NO_CHANGES     = 'status no changes';
const STATUS_SPOT_CLEARED   = 'status spot cleared';
const STATUS_ROUTE_DEFINED  = 'status route defined';

const STATUS_STOPPED                = 'status stopped'; 
const STATUS_MOVED                  = 'status moved'; 
const STATUS_WORLD_CLEARED          = 'status world cleared';
const STATUS_FOWARD_ROUTE           = 'status foward route';
const STATUS_BACKWARDS_ROUTE        = 'status backwards route';
const STATUS_DESTINATION_REACHED    = 'status destination reached';
const STATUS_REFUELING              = 'status refueling';
const STATUS_OUT_OF_FUEL            = 'status out of fuel';

class Action {
    constructor(x, y, status) {
        this.x = x,
        this.y = y,
        this.status = status;
    }
}
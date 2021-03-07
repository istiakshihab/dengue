/**
 * Created by Rajesh on 9/3/19.
 */

import Barisal from './barisal-div';
import Chittagong from './chittagong-div';
import Dhaka from './dhaka-div';
import Khulna from './khulna-div';
import Mymensingh from './mymensingh-div';
import Rajshahi from './rajshahi-div';
import Rangpur from './rangpur-div';
import Sylhet from './sylhet-div';

import DhakaDis from './dhaka-dis';
import shariatpur from './shariatpur-dis';
import madaripur from './madaripur-dis';
import manikganj from './manikganj-dis'
import narayanganj from './narayanganj-dis'
import narsingdi from './narsingdi-dis'
import faridpur from './faridpur-dis'
import gopalganj from './gopalganj-dis'
import munshiganj from './munshiganj-dis'
import rajbari from './rajbari-dis'

import SylhetDis from './sylhet-dis';
import moulvibazar from './moulvibazar-dis';
import habiganj from './habiganj-dis';
import sunamganj from './sunamganj-dis';

import RajshahiDis from './rajshahi-dis';
import bogra from './bogra-dis';
import chapainawabganj from './chapainawabganj-dis';
import joypurhat from './joypurhat-dis';
import naogaon from './naogaon-dis';
import natore from './natore-dis';
import pabna from './pabna-dis';
import sirajganj from './sirajganj-dis';

import MymensinghDis from './mymensingh-dis';
import jamalpur from './jamalpur-dis';
import netrokona from './netrokona-dis';
import sherpur from './sherpur-dis';
import tangail from './tangail-dis';
import kishoreganj from './kishoreganj-dis';

import ChittagongDis from './chittagong-dis';
import bandarban from './bandarban-dis';
import brahmanbaria from './brahmanbaria-dis';
import chandpur from './chandpur-dis';
import coxsbazar from './coxsbazar-dis';
import comilla from './cumilla-dis';
import feni from './feni-dis';
import khagrachhari from './khagrachhari-dis';
import lakshmipur from './lakshmipur-dis';
import noakhali from './noakhali-dis';
import rangamati from './rangamati-dis';

import BarisalDis from './barisal-dis';
import barguna from './barguna-dis';
import bhola from './bhola-dis';
import jhalakathi from './jhalakathi-dis';
import patuakhali from './patuakhali-dis';
import pirojpur from './pirojpur-dis';

import KhulnaDis from './khulna-dist';
import bagerhat from './bagerhat-dist';
import jessore from './jessore-dist';
import satkhira from './satkhira-dist';
import jhenaidah from './jhenaidah-dis';
import magura from './magura-dis';
import narail from './narail-dis';
import chuadanga from './chuadanga-dis';
import meherpur from './meherpur-dis';
import kushtia from './kushtia-dis';

import RangpurDis from './rangpur-dis';
import kurigram from './kurigram-dis';
import nilphamari from './nilphamari-dis';
import lalmonirhat from './lalmonirhat-dis';
import dinajpur from './dinajpur-dis';
import gaibandha from './gaibandha-dis';
import panchagarh from './panchagarh-dis';
import thakurgaon from './thakurgaon-dis';

import gazipur from './gazipur-dis';

const divisions = {
    'বরিশাল': Barisal,
    'চট্টগ্রাম': Chittagong,
    'ঢাকা' : Dhaka,
    'খুলনা': Khulna,
    'ময়মনসিংহ': Mymensingh,
    'রাজশাহী': Rajshahi,
    'রংপুর': Rangpur,
    'সিলেট': Sylhet
};

const districts = {
    dhaka: DhakaDis,
    shariatpur,
    madaripur,
    manikganj,
    narayanganj,
    narsingdi,
    faridpur,
    gopalganj,
    munshiganj,
    rajbari,

    sylhet: SylhetDis,
    moulvibazar,
    habiganj,
    sunamganj,

    rajshahi: RajshahiDis,
    bogra,
    chapainawabganj,
    joypurhat,
    naogaon,
    natore,
    pabna,
    sirajganj,

    mymensingh: MymensinghDis,
    jamalpur,
    netrokona,
    sherpur,
    tangail,
    kishoreganj,

    chittagong: ChittagongDis,
    bandarban,
    brahmanbaria,
    chandpur,
    coxsbazar,
    comilla,
    feni,
    khagrachhari,
    lakshmipur,
    noakhali,
    rangamati,

    barisal: BarisalDis,
    barguna,
    bhola,
    jhalakathi,
    patuakhali,
    pirojpur,

    khulna: KhulnaDis,
    satkhira,
    bagerhat,
    jessore,
    jhenaidah,
    magura,
    narail,
    chuadanga,
    meherpur,
    kushtia,

    rangpur: RangpurDis,
    kurigram,
    lalmonirhat,
    nilphamari,
    dinajpur,
    thakurgaon,
    panchagarh,
    gaibandha,

    gazipur,
};

export {divisions, districts};


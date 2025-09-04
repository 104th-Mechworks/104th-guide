import React, {useMemo} from 'react';
import styles from './styles.module.css';

// Minimal type for internal organization
type Rank = {
  code: string;
  rank: string;
  category: 'fleet-command' | 'command-staff' | 'officer' | 'snco' | 'nco' | 'base';
  level: string; // 'FC-3' | 'FC-2' | 'FC-1' | 'CS-2' | 'CS-1' | 'O-3' | 'O-2' | 'O-1' | 'NCO-5' | 'NCO-4' | 'NCO-3' | 'NCO-2' | 'NCO-1' | 'E-0'
  insigniaPath?: string;
};

// Embedded rank data (approximate mapping to categories/levels for visualization)
const ranksByBranch: Record<string, Rank[]> = {
  command: [
    { code: 'MSHL', rank: 'Marshal', category: 'fleet-command', level: 'FC-2', insigniaPath: '/img/ranks/Command/mshl.webp' },
    { code: 'SCDR', rank: 'Senior Commander', category: 'fleet-command', level: 'FC-2', insigniaPath: '/img/ranks/Command/SCDR.webp' },
    { code: 'MCDR', rank: 'Master Commander', category: 'fleet-command', level: 'FC-3', insigniaPath: '/img/ranks/Command/MCDR.webp' },
  ],
  naval: [
    { code: 'NCDR', rank: 'Naval Commander', category: 'officer', level: 'O-3', insigniaPath: '/img/ranks/aux/NCDR.webp' },
    { code: 'LTCDR', rank: 'Lieutenant Commander', category: 'officer', level: 'O-2', insigniaPath: '/img/ranks/aux/LTCDR.webp' },
    { code: 'NLT', rank: 'Naval Lieutenant', category: 'officer', level: 'O-1', insigniaPath: '/img/ranks/aux/NLT.webp' },
    { code: 'PO1', rank: 'Petty Officer 1st Class', category: 'nco', level: 'NCO-3', insigniaPath: '/img/ranks/aux/PO1.webp' },
    { code: 'PO2', rank: 'Petty Officer 2nd Class', category: 'nco', level: 'NCO-2', insigniaPath: '/img/ranks/aux/PO2.webp' },
    { code: 'PO3', rank: 'Petty Officer 3rd Class', category: 'base', level: 'E-0', insigniaPath: '/img/ranks/aux/PO3.webp' },
  ],
  starfighter: [
    { code: 'COM', rank: 'Commodore', category: 'fleet-command', level: 'FC-1', insigniaPath: '/img/ranks/SFC/COM.webp' },
    { code: 'WCDR', rank: 'Wing Commander', category: 'nco', level: 'NCO-2', insigniaPath: '/img/ranks/SFC/WCDR.webp' },
    { code: 'SCPT', rank: 'Group Captain', category: 'officer', level: 'O-3', insigniaPath: '/img/ranks/SFC/GCPT.webp' },
    { code: 'SL', rank: 'Squadron Leader', category: 'snco', level: 'NCO-5', insigniaPath: '/img/ranks/SFC/SL.webp' },
    { code: 'FCPT', rank: 'Flight Captain', category: 'officer', level: 'O-2', insigniaPath: '/img/ranks/SFC/FCPT.webp' },
    { code: 'FLT', rank: 'Flight Lieutenant', category: 'officer', level: 'O-1', insigniaPath: '/img/ranks/SFC/FLT.webp' },
    { code: 'FO', rank: 'Flight Officer', category: 'nco', level: 'NCO-1', insigniaPath: '/img/ranks/SFC/FO.webp' },
    { code: 'PO', rank: 'Pilot Officer', category: 'base', level: 'E-0', insigniaPath: '/img/ranks/SFC/PILOT.webp' },
  ],
  army: [
    { code: 'MAJ', rank: 'Major', category: 'command-staff', level: 'O-3', insigniaPath: '/img/ranks/army/maj.png' },
    { code: 'CPT', rank: 'Captain', category: 'officer', level: 'O-2', insigniaPath: '/img/ranks/army/cpt.png' },
    { code: 'LT', rank: 'Lieutenant', category: 'officer', level: 'O-1', insigniaPath: '/img/ranks/army/lt.png' },
    { code: 'SGM', rank: 'Sergeant Major', category: 'snco', level: 'NCO-5', insigniaPath: '/img/ranks/army/sgm.png' },
    { code: 'WO', rank: 'Warrant Officer', category: 'snco', level: 'NCO-4', insigniaPath: '/img/ranks/army/wo.png' },
    { code: 'SGT', rank: 'Sergeant', category: 'nco', level: 'NCO-3', insigniaPath: '/img/ranks/army/sgt.png' },
    { code: 'CPL', rank: 'Corporal', category: 'nco', level: 'NCO-2', insigniaPath: '/img/ranks/army/cpl.png' },
    { code: 'LCPL', rank: 'Lance Corporal', category: 'nco', level: 'NCO-1', insigniaPath: '/img/ranks/army/lcpl.png' },
    { code: 'CT', rank: 'Clone Trooper', category: 'base', level: 'E-0', insigniaPath: '/img/ranks/army/ct.png' },
    { code: '2LT', rank: 'Second Lieutenant', category: 'officer', level: 'O-1', insigniaPath: '/img/ranks/army/2lt.png' },
  ],
  arc: [
    { code: 'AMAJ', rank: 'ARC Major', category: 'command-staff', level: 'O-3', insigniaPath: '/img/ranks/ARC/AMAJ.webp' },
    { code: 'ACPT', rank: 'ARC Captain', category: 'officer', level: 'O-2', insigniaPath: '/img/ranks/ARC/ACPT.webp' },
    { code: 'ALT', rank: 'ARC Lieutenant', category: 'officer', level: 'O-1', insigniaPath: '/img/ranks/ARC/ALT.webp' },
    { code: 'ASGT', rank: 'ARC Sergeant', category: 'nco', level: 'NCO-2', insigniaPath: '/img/ranks/ARC/ASGT.webp' },
    { code: 'AT', rank: 'ARC Trooper', category: 'base', level: 'E-0', insigniaPath: '/img/ranks/ARC/AT.webp' },
  ],
  rc: [
    { code: 'RCMAJ', rank: 'RC Major', category: 'officer', level: 'O-3', insigniaPath: '/img/ranks/RC/RCMAJ.webp' },
    { code: 'RCCPT', rank: 'RC Captain', category: 'officer', level: 'O-2', insigniaPath: '/img/ranks/RC/RCCPT.webp' },
    { code: 'RCLT', rank: 'RC Lieutenant', category: 'officer', level: 'O-1', insigniaPath: '/img/ranks/RC/RCLT.webp' },
    { code: 'RCSGM', rank: 'RC Sergeant Major', category: 'snco', level: 'NCO-5', insigniaPath: '/img/ranks/RC/RCSGM.webp' },
    { code: 'RCSGT', rank: 'RC Sergeant', category: 'nco', level: 'NCO-3', insigniaPath: '/img/ranks/RC/RCSGT.webp' },
    { code: 'RCCPL', rank: 'RC Corporal', category: 'nco', level: 'NCO-2', insigniaPath: '/img/ranks/RC/RCCPL.webp' },
    { code: 'RCPVT', rank: 'RC Private', category: 'base', level: 'E-0', insigniaPath: '/img/ranks/RC/RCPVT.webp' },
    { code: 'RC2LT', rank: 'RC Second Lieutenant', category: 'officer', level: 'O-1', insigniaPath: '/img/ranks/RC/RC2LT.webp' },
  ],
};

const branchColors: Record<string, { bgClass: string; borderClass: string; textClass: string }> = {
  naval: {bgClass: styles.bgNaval, borderClass: styles.borderNaval, textClass: styles.textLight},
  starfighter: {bgClass: styles.bgStarfighter, borderClass: styles.borderStarfighter, textClass: styles.textLight},
  army: {bgClass: styles.bgArmy, borderClass: styles.borderArmy, textClass: styles.textLight},
  arc: {bgClass: styles.bgArc, borderClass: styles.borderArc, textClass: styles.textLight},
  rc: {bgClass: styles.bgRc, borderClass: styles.borderRc, textClass: styles.textLight},
  command: {bgClass: styles.bgCommand, borderClass: styles.borderCommand, textClass: styles.textLight},
};

const specialRedRanks = ['MCDR', 'SCDR', 'MSHL'];

const categories = [
  {id: 'fleet-command', name: 'FLEET COMMAND', colorClass: styles.catFleet, lineClass: styles.lineFleet, levels: ['FC-3', 'FC-2', 'FC-1']},
  {id: 'command-staff', name: 'COMMAND STAFF', colorClass: styles.catCommand, lineClass: styles.lineCommand, levels: ['CS-2', 'CS-1']},
  {id: 'officer', name: 'OFFICERS', colorClass: styles.catOfficer, lineClass: styles.lineOfficer, levels: ['O-3', 'O-2', 'O-1']},
  {id: 'snco', name: 'SENIOR NCO', colorClass: styles.catSnco, lineClass: styles.lineSnco, levels: ['NCO-5', 'NCO-4']},
  {id: 'nco', name: 'NCOs', colorClass: styles.catNco, lineClass: styles.lineNco, levels: ['NCO-3', 'NCO-2', 'NCO-1']},
  {id: 'base', name: 'ENLISTED', colorClass: styles.catBase, lineClass: styles.lineBase, levels: ['E-0']},
] as const;

export default function RanksComparisonChart() {
  const organizedRanks = useMemo(() => {
    const result: Record<string, Record<string, Record<string, Rank | null>>> = {};

    categories.forEach((category) => {
      result[category.id] = {};
      category.levels.forEach((level) => {
        result[category.id][level] = {
          naval: null,
          starfighter: null,
          army: null,
          arc: null,
          rc: null,
          command: null,
        } as Record<string, Rank | null>;
      });
    });

    const branches = ['naval', 'starfighter', 'army', 'arc', 'rc', 'command'] as const;
    branches.forEach((branch) => {
      const branchList = ranksByBranch[branch] || [];
      branchList.forEach((rank) => {
        if (!result[rank.category] || !result[rank.category][rank.level]) return;
        if (branch === 'command') {
          if (rank.code === 'MCDR' || rank.code === 'SCDR') {
            result[rank.category][rank.level].army = rank;
          } else if (rank.code === 'MSHL') {
            result[rank.category][rank.level].starfighter = rank;
          } else {
            result[rank.category][rank.level].command = rank;
          }
        } else {
          result[rank.category][rank.level][branch] = rank;
        }
      });
    });

    return result;
  }, []);

  const renderRankBox = (branch: string, rank: Rank | null) => {
    if (!rank) return <div className={styles.rankBoxEmpty} />;
    const isSpecial = specialRedRanks.includes(rank.code);
    const colors = isSpecial
      ? {bgClass: styles.bgSpecial, borderClass: styles.borderSpecial, textClass: styles.textSpecial}
      : branchColors[branch] || branchColors.army;

    return (
      <div className={`${styles.rankBox} ${colors.bgClass} ${colors.borderClass} ${colors.textClass}`} title={rank.rank}>
        <span className={styles.rankCode}>{rank.code}</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Rank Comparison Chart</h2>
      </div>

      <div className={styles.table}>
        <div className={styles.tableInner}>
          <div className={styles.headerRow}>
            <div className={styles.spacer} />
            <div className={`${styles.colHeader} ${styles.colHeaderNaval}`}>NAVAL AUX</div>
            <div className={`${styles.colHeader} ${styles.colHeaderStarfighter}`}>STARFIGHTER CORPS</div>
            <div className={`${styles.colHeader} ${styles.colHeaderArmy}`}>ARMY</div>
            <div className={`${styles.colHeader} ${styles.colHeaderArc}`}>ADVANCED RECON COMMANDO</div>
            <div className={`${styles.colHeader} ${styles.colHeaderRc}`}>REPUBLIC COMMANDO</div>
          </div>

          {categories.map((category) => (
            <div key={category.id} className={styles.categoryBlock}>
              <div className={styles.categoryHeaderRow}>
                <div className={styles.categoryNameWrapper}>
                  <h3 className={`${styles.categoryName} ${category.colorClass}`}>{category.name}</h3>
                </div>
                <div className={styles.categoryDivider}>
                  <div className={`${styles.categoryLine} ${category.lineClass}`} />
                </div>
              </div>

              {category.levels.map((level) => {
                const levelRanks = organizedRanks[category.id][level];
                return (
                  <div key={`${category.id}-${level}`} className={styles.row}>
                    <div className={styles.levelCell}>{level}</div>
                    <div className={styles.cell}>{renderRankBox('naval', levelRanks.naval)}</div>
                    <div className={styles.cell}>{renderRankBox('starfighter', levelRanks.starfighter)}</div>
                    <div className={styles.cell}>{renderRankBox('army', levelRanks.army)}</div>
                    <div className={styles.cell}>{renderRankBox('arc', levelRanks.arc)}</div>
                    <div className={styles.cell}>{renderRankBox('rc', levelRanks.rc)}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footnote}>* This chart shows equivalent ranks across different branches of the 104th Battalion.</div>
    </div>
  );
} 
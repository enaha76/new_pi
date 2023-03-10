<?php

namespace App\Http\Controllers;


use App\Models\Etudiant;
use App\Models\Inscrire;
use Illuminate\Http\Request;
use App\Models\Etablissement;
use Illuminate\Support\Facades\DB;


class all_studentsController extends Controller
{

  private $imported_data;

  public function index()
  {
    $currentYear = date('Y');
    $lastYear = $currentYear -1;
    $year = $lastYear . '-' . $currentYear;


    
    $List = DB::select('SELECT
     abrev,
     etablissements.nom,
     etablissements.id,
     etablissements.identifiant,
     COUNT(id_etablissement) as total 
     FROM
      inscrire 
      RIGHT JOIN
       etablissements
       on 
       etablissements.id=inscrire.id_etablissement 
    GROUP BY
     abrev,
     etablissements.nom,id,identifiant;
     
    ');
    $List = (array) $List;

    $List2=DB::select('SELECT etablissements.id,
    etablissements.nom,
    etablissements.type,
    etablissements.abrev, 
    COUNT(inscrire.id_etablissement) as total
    FROM etablissements
    LEFT JOIN etablissements 
    as identifiantEtablissement
     ON identifiantEtablissement.id = etablissements.identifiant
    LEFT JOIN
     inscrire 
     ON inscrire.id_etablissement = etablissements.id
    WHERE 
    identifiantEtablissement.identifiant 
    IS NULL AND 
    etablissements.identifiant IS NULL
    GROUP BY etablissements.id,
        nom,
        abrev,
        type;');
    // $List = get_object_vars($List);
    $List2 = (array) $List2;

    $List3=DB::select('SELECT
     etablissements.id,
     etablissements.nom,
     etablissements.abrev,
     etablissements.identifiant 
     FROM 
     etablissements 
     WHERE (identifiant is not null) 
     or
      (identifiant is null AND type=\'institut\');');
      $List3 = (array) $List3;

      $List4=DB::select('SELECT 
      SUM(CASE WHEN type=\'Universit√©\' THEN 1 ELSE 0 END) as \'Universit√©\', 
      SUM(CASE WHEN type=\'Ecole\' THEN 1 ELSE 0 END) as \'Ecole\',
      SUM(CASE WHEN type=\'Academie\' THEN 1 ELSE 0 END) as \'Academie\',
      SUM(CASE WHEN type=\'institut\' THEN 1 ELSE 0 END) as \'institut\',
      SUM(CASE WHEN type=\'Facult√©\' THEN 1 ELSE 0 END) as \'Facult√©\'
      
        FROM etablissements;');

        $List4 = (array) $List4;

        $List5=DB::select('SELECT COUNT(*) as nbr from etudiants');
        $nbr_etudient = (array) $List5;
    return view('index', compact('List','List2','List3','List4','nbr_etudient'));
    
  }
  public function etu($year = null) {
    if (!$year) {
        $currentYear = date('Y');
        $lastYear = $currentYear -1;
        $year = $lastYear . '-' . $currentYear;
    }
    
    $enrollments = DB::table('inscrire')
    ->selectRaw('inscrire.*, etudiants.*, inscrire.ann√©e_scolaire , inscrire.id ')
    ->where('ann√©e_scolaire','=',$year)
    ->join('etudiants', 'inscrire.id_etudiant', '=', 'etudiants.id')
    ->get();
     $years=DB::table('inscrire')->pluck('ann√©e_scolaire')->unique()->except($year);

    $Etablissements = Etablissement::all();
    $Etablissements=$Etablissements->toArray();
    $enrollments=$enrollments->toArray();
    return View('etudiants',compact('Etablissements','enrollments','years','year'));
  }


  public function tables($year = null)
  {
      $etats = Etablissement::all();
   
      $List3=DB::select('SELECT
      etablissements.id,
      etablissements.nom,
      etablissements.abrev,
      etablissements.identifiant 
      FROM 
      etablissements 
      WHERE (identifiant is not null) 
      or
       (identifiant is null AND type=\'institut\');');
       $List3 = (array) $List3;
      
       $List4=DB::select('SELECT 
       DISTINCT
       (id_etudiant) as idc,
       id_etablissement,
       ann√©e_scolaire 
       FROM 
       inscrire;');
       $List4 = (array) $List4;
    
      if (!$year) {
          $currentYear = date('Y');
          $lastYear = $currentYear -1;
          $year = $lastYear . '-' . $currentYear;
      }
      $years=DB::table('inscrire')->pluck('ann√©e_scolaire')->unique()->except($year);
      $chek=DB::select('SELECT NNI,ann√©e_scolaire from inscrire JOIN etudiants on inscrire.id_etudiant=etudiants.id;');
        $chek = (array) $chek;
      return view('tables', [
        'etats' => $etats,
        'List3' => $List3,
        'data' => $List4,
        'year' => $year,
        'years' => $years,
        'chek'=>$chek
    ]);
  }
  
  public function import(Request $request)
  {



    //validate the form data
    // $request->validate([
    //     'year' => 'required',
    //     'establishment' => 'required'
    // ]);

    $year = $request->input('year');
    $establishment = $request->input('establishment');

    //check if the file has already been imported
    
    

      //ask for permission to overwrite the data
     
      //proceed with import

      $data = json_decode($request->input('file'), true);

      if ($data) {
        return $this->insert( $data, $establishment, $year);
      }
      return redirect()->route('tables')->with('danger', 'Les donn√©es non √©t√© pas import√©es ');


    
  }
  public function insert( $data, $establishment, $year)
  {

   
      foreach ($data as $value) {
        $student = Etudiant::firstOrCreate([
          'NNI' => $value['NNI'],
          'N¬į_de_BAC' => $value['N¬į_de_BAC'],
          'Nom_et_prenom' => $value['Nom_et_prenom'],
          'GENRE' => $value['GENRE'],
          'date_DE_NAISSANCE' => date('Y:m:d', $value['date_DE_NAISSANCE']),
          'NATIONALITE' => $value['NATIONALITE']
        ]);

        $Inscrire = Inscrire::firstOrCreate([
          'id_etudiant' => $student->id,
          'id_etablissement' => $establishment,
          'ann√©e_scolaire' => $year,
          'N¬į_inscription' => $value['N¬į_inscription'],
          'Niveau' => $value['Niveau'],
          'ANNEE_UNIVERSITAIRE_DE_premi√®re_inscription_DANS_LE_CYCLE' => $value['ANNEE_UNIVERSITAIRE_DE_premi√®re_inscription_DANS_LE_CYCLE'],
          'ANNEE_UNIVERSITAIRE_DE_premi√®re_inscription_DANS_ce_niveau' => $value['ANNEE_UNIVERSITAIRE_DE_premi√®re_inscription_DANS_ce_niveau'],
          'NOM_DU_(TRONC/FILIRERE)' => $value['NOM_DU_(TRONC/FILIRERE)'],
          'FORMATION' => $value['FORMATION'],
          'Redoublant' => $value['Redoublant'],
          'BOURSIER_OU_BENEFICIANTS_D\'AIDE' => $value['BOURSIER_OU_BENEFICIANTS_D\'AIDE'],
          'TRANSFERE' => $value['TRANSFERE'],
          'ann√©e_universitaire_de_la_premi√®re_inscription_√†_l\'√©tablissement' => $value['ann√©e_universitaire_de_la_premi√®re_inscription_√†_l\'√©tablissement'],
          'etablissement_de_provenance' => $value['etablissement_de_provenance'],
          'LANGUE_DE_FORMATION' => $value['LANGUE_DE_FORMATION']
        ]);
      }
      return redirect()->route('tables')->with('success', 'Les donn√©es ont √©t√© import√©es avec succ√®s!');
    
  }
  public function redr(Request $request)
  {
    $data = json_decode($request->input('file'), true);
      $year = $request->input('year');
      $establishment = $request->input('establishment');
     return $this->insert( $data, $establishment, $year);
  }
  
}






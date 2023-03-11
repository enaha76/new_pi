<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $annee_scolaire
 * @property string $etablissements
 * @property int    $nb1
 * @property int    $nb2
 * @property int    $nb3
 * @property int    $nb4
 */
class EffectifEtbGMEt extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'effectif_etb_g_m_et';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'annee_scolaire', 'etablissements', 'nb1', 'nb2', 'nb3', 'nb4'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'annee_scolaire' => 'string', 'etablissements' => 'string', 'nb1' => 'int', 'nb2' => 'int', 'nb3' => 'int', 'nb4' => 'int'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = true;

    // Scopes...

    // Functions ...

    // Relations ...
}

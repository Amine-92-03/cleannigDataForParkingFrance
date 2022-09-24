let sqlDelete = ()=> {
    return `
    TRUNCATE TABLE [dbo].[bnlsData]
    `
}


let sqlInsert =(dataLine) =>{
    return `
INSERT INTO bnlsData(
           [id]
          ,[nom]
          ,[insee]
          ,[adresse]
          ,[urlParking]
          ,[type_usagers]
          ,[gratuit]
          ,[nb_places]
          ,[nb_pr]
          ,[nb_pmr]
          ,[nb_voitures_electriques]
          ,[nb_velo]
          ,[nb_2r_el]
          ,[nb_autopartage]
          ,[nb_2_rm]
          ,[nb_covoit]
          ,[hauteur_max]
          ,[num_siret]
          ,[Xlong]
          ,[Ylat]
          ,[tarif_pmr]
          ,[tarif_1h]
          ,[tarif_2h]
          ,[tarif_3h]
          ,[tarif_4h]
          ,[tarif_24h]
          ,[abo_resident]
          ,[abo_non_resident]
          ,[type_ouvrage]
          ,[info]
          ,[id_source]

    )VALUES(' ${dataLine[0]}',
    '${dataLine[1]}',
    '${dataLine[2]}',
    '${dataLine[3]}',
    '${dataLine[4]}',
    '${dataLine[5]}',
    '${dataLine[6]}',
    '${dataLine[7]}',
    '${dataLine[8]}',
    '${dataLine[9]}',
    '${dataLine[10]}',
    '${dataLine[11]}',
    '${dataLine[12]}',
    '${dataLine[13]}',
    '${dataLine[14]}',
    '${dataLine[15]}',
    '${dataLine[16]}',
    '${dataLine[17]}',
    '${dataLine[18]}',
    '${dataLine[19]}',
    '${dataLine[20]}',
    '${dataLine[21]}',
    '${dataLine[22]}',
    '${dataLine[23]}',
    '${dataLine[24]}',
    '${dataLine[25]}',
    '${dataLine[26]}',
    '${dataLine[27]}',
    '${dataLine[28]}',
    '${dataLine[29]}',
    '${dataLine[30]}'
        )
    `
} 
export  {sqlInsert, sqlDelete}



const depMapCNVQuery = geneId => ({
	from: 'Gene',
	select: [
		'Gene.depMapCopyNumber.depMapID.DepMapID',
		'Gene.depMapCopyNumber.depMapID.Lineage',
		'Gene.depMapCopyNumber.depMapID.Disease',
		'Gene.depMapCopyNumber.value'
	],
	orderBy: [
		{
			path: 'Gene.depMapCopyNumber.depMapID.Disease',
			direction: 'ASC'
		}
	],
	where: [
		{
			path: 'Gene.id',
			op: '=',
			value: geneId
		}
	]
});

function queryData(geneId, serviceUrl, imjsClient = imjs) {
	return new Promise((resolve, reject) => {
		const service = new imjsClient.Service({ root: serviceUrl });
		service
			.records(depMapCNVQuery(geneId))
			.then(data => {
				if (data && data.length) resolve(data[0]);
				else reject('No data found!');
			})
			.catch(reject);
	});
}

export default queryData;
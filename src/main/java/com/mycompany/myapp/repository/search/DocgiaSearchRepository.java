package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Docgia;
import java.util.stream.Stream;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Docgia} entity.
 */
public interface DocgiaSearchRepository extends ElasticsearchRepository<Docgia, Long>, DocgiaSearchRepositoryInternal {}

interface DocgiaSearchRepositoryInternal {
    Stream<Docgia> search(String query);
}

class DocgiaSearchRepositoryInternalImpl implements DocgiaSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;

    DocgiaSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate) {
        this.elasticsearchTemplate = elasticsearchTemplate;
    }

    @Override
    public Stream<Docgia> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return elasticsearchTemplate.search(nativeSearchQuery, Docgia.class).map(SearchHit::getContent).stream();
    }
}

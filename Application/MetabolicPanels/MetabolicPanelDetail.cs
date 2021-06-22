using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.MetabolicPanels
{
    public class MetabolicPanelDetail
    {
        public class Query : IRequest<MetabolicPanel>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, MetabolicPanel>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<MetabolicPanel> Handle(Query request, CancellationToken cancellationToken)
            {
                    return await _context.MetabolicPanels.FindAsync(request.Id);

            }
        }
    }
}